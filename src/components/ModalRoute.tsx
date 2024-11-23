import { type ReactNode, useCallback } from "react";
import { Dialog, DialogContent } from "~/components/Dialog";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  children: ReactNode;
};

export default function ModalRoute({ children }: Props) {
  const navigate = useNavigate();

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        // @TODO: Is there a back?
        navigate({
          to: "/posts",
        });
      }
    },
    [navigate],
  );

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
