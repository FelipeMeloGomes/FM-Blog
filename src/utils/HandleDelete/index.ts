export const handleDeletePost = (
  postId: string,
  createdBy: string,
  userId: string | undefined,
  deleteDocument: (id: string) => void,
) => {
  if (userId === createdBy) {
    deleteDocument(postId);
  } else {
    alert("Você não tem permissão para excluir este post.");
  }
};
