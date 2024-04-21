import React, { useState, useRef, useEffect } from "react";
import { Input, Avatar } from "@mui/material";
import {
  createCommentForWorkItem,
  deleteCommentById,
  editCommentById,
  getAllCommentsByWorkItemId,
} from "../../../Api/comments";
import { Button } from "@mui/joy";
import { Close, Delete, Edit } from "@mui/icons-material";
import "./comment.css";
import Alert from "@mui/material/Alert";
import toast from "react-hot-toast";

function CommentSection({ workItemId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the ID of the comment being edited
  const [editedCommentContent, setEditedCommentContent] = useState(""); // Track the edited content
  const commentContainerRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    commentContainerRef.current.scrollTop =
      commentContainerRef.current.scrollHeight;
  }, [comments]);

  const fetchComments = async () => {
    try {
      const response = await getAllCommentsByWorkItemId(workItemId);
      setComments(response.data);
      console.log(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const response = await createCommentForWorkItem(workItemId, newComment);
        fetchComments();
        // Clear the input field
        setNewComment("");
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
  };

  const saveEditedComment = async (editingCommentId, editedCommentContent) => {
    try {
      const response = await editCommentById(
        editingCommentId,
        editedCommentContent
      );
      console.log(response);
      fetchComments();
      cancelEdit();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Display confirmation toast
      const confirmationToastId = toast((t) => (
        <span className="flex gap-2">
          <Alert severity="warning">Do you want to delete this comment?</Alert>
          <button
            className="px-3 btn"
            onClick={() => handleConfirmDelete(commentId, t.id)}
          >
            Yes
          </button>
        </span>
      ));

      // Function to handle confirmed deletion
      const handleConfirmDelete = async (commentId, toastId) => {
        try {
          await deleteCommentById(commentId);
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          toast.dismiss(toastId);
          fetchComments();
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      };
    } catch (error) {
      console.error("Error displaying confirmation toast:", error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          backgroundColor: "#F1F1F1",
        }}
        ref={commentContainerRef}
      >
        {comments.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            No comments
          </div>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.commentId} className="flex items-center mb-2 ">
              <Avatar
                src={
                  comment.commentedBy.profile_image_path
                    ? `${comment.commentedBy.profile_image_path}`
                    : "/src/assets/workers.jpg"
                }
                alt="Profile Picture"
                style={{ marginRight: "10px" }}
              />
              <div
                className="comment-container"
                style={{
                  backgroundColor: "white",
                  width: "600px",
                  padding: 30,
                  borderRadius: 20,
                }}
              >
                <div className="flex justify-between comment">
                  <strong className="comment-header">
                    {comment.commentedBy.fullName}
                  </strong>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "0.8rem",
                      color: "#555",
                    }}
                  >
                    {new Date(comment.commentedOn).toLocaleString()}
                  </span>
                </div>
                {editingCommentId === comment.commentId ? (
                  <Input
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    fullWidth
                    multiline
                  />
                ) : (
                  <div className="comment-content">{comment.content}</div>
                )}
                <div>
                  {editingCommentId === comment.commentId ? (
                    <>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="soft"
                          color="success"
                          className="py-2 mt-2"
                          onClick={() =>
                            saveEditedComment(
                              comment.commentId,
                              editedCommentContent
                            )
                          }
                        >
                          Save
                        </Button>
                        <Button
                          variant="soft"
                          color="danger"
                          className="py-2 mt-2"
                          onClick={cancelEdit}
                        >
                          cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-end gap-3">
                        {comment.edited && (
                          <span style={{ color: "blue" }}>edited</span>
                        )}
                        <Edit
                          className="comment_icons"
                          onClick={() =>
                            handleEditComment(
                              comment.commentId,
                              comment.content
                            )
                          }
                        />
                        <Delete
                          className="comment_icons"
                          onClick={() => handleDeleteComment(comment.commentId)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-row p-3" style={{ width: "100%" }}>
        <Input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Enter your comment"
          fullWidth
          variant="outlined"
          maxRows={10}
          multiline
          size="small"
          style={{ paddingLeft: "10px", marginRight: "10px", flex: "3" }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddComment}
          style={{ flex: "1" }}
        >
          Add Comment
        </Button>
      </div>
    </>
  );
}

export default CommentSection;
