import Button from "@/components/atoms/Button/button";
import LoadingComponent from "@/components/atoms/Loading/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { ConfirmModalProps } from "./types";

export function ConfirmationModal({
  isOpen,
  setIsOpen,
  title,
  description,
  content,
  actionLabel,
  action,
  loading
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border-2 border-purple-400 text-center sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingComponent className="h-9 w-9" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <span className="text-lg">{content}</span>
            </div>
            <DialogFooter className="flex gap-6 sm:justify-center">
              <Button
                variant="secondary-purple"
                onClick={() => action()}
                size="sm"
                className="w-44"
              >
                {actionLabel}
              </Button>
              <Button
                className="w-44 rounded-2xl bg-intense-purple text-white"
                onClick={() => setIsOpen(false)}
                size="sm"
              >
                Cancelar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
