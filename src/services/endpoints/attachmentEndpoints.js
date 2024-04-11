export const attachmentRoutes ={
  createAttachment_URL : `/workItem/attachments/add_attachment_to_work_item`, // add path variable workItem id and requestparam attachment_description
  getAllAttachmentByWorkItem_URL : "/workItem/attachments/getAllByWorkItemId",//path variable   workitem id
  deleteAttachment_URL : "/workItem/attachments/deleteById", //pathvariable attachment id 
  update_description_URL : "/workItem/attachments/update_description",//provide parameter attachmentid and descripton 
}