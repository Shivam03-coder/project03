import React, { useCallback, useState } from "react";
import { AddIcon } from "../../../../constants";
import { Typography } from "@material-tailwind/react";
import ContactSearchDialog from "../../../shared/dialogs/ContactSearchDialog";

const DirectmessageSection = () => {
  const [ShowDialog, setShowDialog] = useState(false);

  const handleMsgDialog = useCallback(() => {
    setShowDialog((prevValue) => !prevValue);
  }, []);

  return (
    <section className="mt-7">
      <div className="flex justify-evenly gap-7 px-5">
        <Typography variant="h5" className="font-Inter" >CONTACTS</Typography>
        <AddIcon
          onClick={handleMsgDialog}
          className="size-7 font-bold cursor-pointer text-secondary-200"
        />
        {ShowDialog && (
          <ContactSearchDialog
            showDialog={ShowDialog}
            setShowDialog={setShowDialog}
          />
        )}
      </div>
    </section>
  );
};

export default DirectmessageSection;
