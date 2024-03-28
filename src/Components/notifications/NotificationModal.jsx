import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";

import Loader from '../../common/Loader'
import { acceptMemberInvitation } from "../../Api/invitation";
import toast from "react-hot-toast";

export default function NotificationModal({ notification }) {
  console.log(notification && notification);

  const [isLoading ,setIsLoading] = React.useState(false);

  const handleAcceptButtonClick = async(token)=>{
    
    try {
      console.log(token.toString())
      setIsLoading(true);
      const response = await acceptMemberInvitation(token);
      console.log(response.data);
      setIsLoading(false);
      setOpen(false)
      toast.success(response.data.message)

    } catch (error) {
      console.log(error.response.data)
      setIsLoading(false)
    }
    
  }

  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        details
      </Button>
      {
        isLoading
        ?
        <Loader/>
        :
        <>
        <Modal  open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>You have invited</DialogTitle>
          <div>
            <b>Invite From :</b>{" "}
            <span>{notification && notification.invitation_from}</span>
          </div>
          <div>
            <b>Message :</b>{" "}
            <span>{notification && notification.invitation_message}</span>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <div>
                <b>Project Title :</b> <span>{notification.project_title}</span>
              </div>
              {
                notification && notification.invitation_status == "ACCEPTED" 
                ?
                <>
                <Button color="primary" 
                
               >Accepted</Button>
                </>
                :
                <Button color="success" 
                onClick={()=>handleAcceptButtonClick(notification.invitation_token)}
               >Accept</Button>
              }
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
        </>
      }
    </React.Fragment>
  );
}
