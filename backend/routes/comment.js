import express from "express"
import prisma from "../config/prisma.js"
import { authenticateToken, optionalAuth } from "../middleware/auth.js"

const router = express.Router()

router.get("/", optionalAuth, async (req, res) => {
  try {
        const limit = parseInt(req.query.limit) || undefined
    const skip = parseInt(req.query.skip) || undefined
    const rootOnly = req.query.rootOnly === "true"

        const queryOptions = {
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }

        if (limit) queryOptions.take = limit
    if (skip) queryOptions.skip = skip

        const comments = await prisma.comment.findMany(queryOptions)

        const totalCount = await prisma.comment.count()

        if (rootOnly) {
      const rootComments = comments.filter((c) => !c.parentId).map((c) => ({ ...c, replies: [] }))
      return res.json({
        comments: rootComments,
        pagination: {
          total: totalCount,
          limit: limit || totalCount,
          skip: skip || 0,
          hasMore: skip + limit < totalCount,
        },
      })
    }

        const commentMap = {}
    const rootComments = []

        comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] }
    })

        comments.forEach((comment) => {
      if (comment.parentId && commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(commentMap[comment.id])
      } else if (!comment.parentId) {
        rootComments.push(commentMap[comment.id])
      }
    })

    res.json({
      comments: rootComments,
      pagination: {
        total: totalCount,
        limit: limit || totalCount,
        skip: skip || 0,
        hasMore: limit && skip !== undefined ? skip + limit < totalCount : false,
      },
    })
  } catch (error) {
    console.error("Get comments error:", error)
    res.status(500).json({ error: "Failed to fetch comments" })
  }
})

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { text } = req.body

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Comment text is required" })
    }

    if (text.length > 1000) {
      return res.status(400).json({ error: "Comment text is too long (max 1000 characters)" })
    }

    const comment = await prisma.comment.create({
      data: {
        text: text.trim(),
        userId: req.user.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(201).json({ comment: { ...comment, replies: [] } })
  } catch (error) {
    console.error("Create comment error:", error)
    res.status(500).json({ error: "Failed to create comment" })
  }
})

router.post("/:commentId/reply", authenticateToken, async (req, res) => {
  try {
    const { commentId } = req.params
    const { text } = req.body

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Reply text is required" })
    }

    if (text.length > 1000) {
      return res.status(400).json({ error: "Reply text is too long (max 1000 characters)" })
    }

        const parentComment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!parentComment) {
      return res.status(404).json({ error: "Parent comment not found" })
    }

    const reply = await prisma.comment.create({
      data: {
        text: text.trim(),
        userId: req.user.userId,
        parentId: commentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(201).json({ comment: { ...reply, replies: [] } })
  } catch (error) {
    console.error("Create reply error:", error)
    res.status(500).json({ error: "Failed to create reply" })
  }
})

router.post("/:commentId/like", authenticateToken, async (req, res) => {
  try {
    const { commentId } = req.params

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        likes: { increment: 1 },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.json({ comment: updatedComment })
  } catch (error) {
    console.error("Like comment error:", error)
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Comment not found" })
    }
    res.status(500).json({ error: "Failed to like comment" })
  }
})

export default router
