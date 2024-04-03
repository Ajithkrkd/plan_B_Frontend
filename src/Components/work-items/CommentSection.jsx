import React, { useState, useRef, useEffect } from "react";
import { Input, Avatar } from "@mui/material";
import { createCommentForWorkItem, deleteCommentById, editCommentById, getAllCommentsByWorkItemId } from "../../Api/comments";
import { Button } from "@mui/joy";
import { Delete, Edit } from "@mui/icons-material";

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

  const saveEditedComment = async (editingCommentId,editedCommentContent ) => {
    try {
     const response =  await editCommentById(editingCommentId, editedCommentContent);
     console.log(response);
      fetchComments();
      cancelEdit();
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async(commentId) => {
    try {
      await deleteCommentById(commentId);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          backgroundColor: "#E5E7EB",
        }}
        ref={commentContainerRef}
      >
        {comments.map((comment, index) => (
          <div key={index} className="flex items-center mb-2">
            <Avatar
              src={
                comment.commentedBy.profile_image_path
                  ? `http://localhost:8081${comment.commentedBy.profile_image_path}`
                  : "/src/assets/workers.jpg"
              }
              alt="Profile Picture"
              style={{ marginRight: "10px" }}
            />
            <div className="" style={{backgroundColor:'white', width:"600px", padding:30 , borderRadius:20}}>
              <div>
                <strong>{comment.commentedBy.fullName}</strong>
                <span style={{ marginLeft: "5px", fontSize: "0.8rem", color: "#555" }}>
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
                <div className="">{comment.content}</div>
              )}
              <div>
                {editingCommentId === comment.commentId ? (
                  <>
                 <Button size="small" onClick={() => saveEditedComment(comment.commentId, editedCommentContent)}>Save</Button>

                    <Button size="small" onClick={cancelEdit}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button size="small" variant="outlined" color="primary" className="py-1 px-2" onClick={() => handleEditComment(comment.commentId, comment.content)}>Edit<Edit color="primary"/></Button>
                    <Button size="small" variant="outlined" color="primary" className="py-1 px-2" onClick={() => handleDeleteComment(comment.commentId)}>Delete<Delete color="error"/> </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
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
