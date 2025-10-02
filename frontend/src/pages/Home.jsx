import React, { useState, useEffect } from "react";
import Comment from "../components/Comment";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

export default function Home() {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const limit = 10;

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/comments?limit=${limit}&skip=${page * limit}`
      );
      const data = await res.json();
      setComments(data.comments || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  const handlePost = async () => {
    if (!token) {
      alert("Please login to post comments");
      return;
    }
    if (!newComment.trim()) return;

    setPosting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        setPage(0);         fetchComments();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post comment");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  const handleReply = async (parentId, text) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments/${parentId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (res.ok) {
        fetchComments();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post reply");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchComments();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to like comment");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Discussion</h2>
          
          {token ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="3"
              />
              <button
                onClick={handlePost}
                disabled={posting || !newComment.trim()}
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
              >
                {posting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-800">
                Please <a href="/login" className="font-semibold underline">login</a> to post comments
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onLike={handleLike}
              />
            ))
          )}
        </div>

        {pagination && (
          <div className="flex justify-between items-center mt-8 bg-white rounded-lg shadow-md p-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            
            <span className="text-gray-600">
              Page {page + 1} {pagination.total && `of ${Math.ceil(pagination.total / limit)}`}
            </span>
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={!pagination.hasMore}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
