import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useGetAppointments } from "./use-get-appointment";
import { useCreateAppointment } from "./use-create-appointment";
import Select from "@/components/select";

  
  export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
    const appointmentQuery = useGetAppointments();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name: name
    })

    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const [promise, setPromise] = useState<{resolve: (value: string | undefined) => void } | null>(null)
    const selectValue = useRef<string>();


    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });
    })

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    }

    const AccountDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Select Account
                    </DialogTitle>
                    <DialogDescription>
                        Please Select an account to continue
                    </DialogDescription>
                </DialogHeader>
                <Select
                 placeholder="Select an account"
                 options={accountOptions}
                 onCreate={onCreateAccount}
                 onChange={(value) => selectValue.current = value}
                 disabled={accountQuery.isLoading || accountMutation.isPending}
                />
                <DialogFooter className="pt-2">
                    <Button
                    onClick={handleCancel}
                    variant={'outline'}
                    >
                        Cancel
                    </Button>
                    <Button
                    onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [AccountDialog, confirm]
  }