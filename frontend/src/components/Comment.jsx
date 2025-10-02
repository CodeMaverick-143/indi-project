import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Comment({ comment, onReply, onLike }) {
  const { token } = useContext(AuthContext);
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!token) {
      alert("Please login to reply");
      return;
    }
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    await onReply(comment.id, replyText);
    setReplyText("");
    setShowReply(false);
    setIsSubmitting(false);
  };

  const handleLike = async () => {
    if (!token) {
      alert("Please login to like comments");
      return;
    }
    await onLike(comment.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="border-l-2 border-gray-300 pl-4 ml-2 mt-3">
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {comment.user?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{comment.user?.username || "Anonymous"}</p>
            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
        
        <p className="text-gray-800 mb-3">{comment.text}</p>
        
        <div className="flex gap-3 items-center">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition"
          >
            <span>👍</span>
            <span>Like ({comment.likes || 0})</span>
          </button>
          
          <button
            onClick={() => setShowReply(!showReply)}
            className="text-sm text-gray-600 hover:text-gray-700 font-medium transition"
          >
            💬 Reply
          </button>
        </div>

        {showReply && (
          <div className="mt-3 bg-gray-50 p-3 rounded-md">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleReply}
                disabled={isSubmitting || !replyText.trim()}
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? "Posting..." : "Post Reply"}
              </button>
              <button
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} onLike={onLike} />
          ))}
        </div>
      )}
    </div>
  );
}
