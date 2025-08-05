import accountApiRequest from "@/apiRequests/account";
import { UpdateEmployeeAccountBodyType } from "@/schemaValidations/account.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IdCardLanyardIcon } from "lucide-react";

export const useAccountMe = () => {
  return useQuery({
    queryKey: ["account-me"],
    queryFn: accountApiRequest.me,
  });
};

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMe,
  });
};
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.changePassword,
  });
};

export const useGetAccountList = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: accountApiRequest.list,
  });
};

export const useGetAccount = (id: number | undefined) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => accountApiRequest.getEmployee(id!),
    // id! Tôi chắc chắn id không phải undefined hoặc null khác với id as number	Tôi chắc chắn id là kiểu number
    enabled: !!id,
    // Boolean(id)
  });
};

export const useAddAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdateEmployeeAccountBodyType & { id: number }) =>
      accountApiRequest.updateEmployee(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        exact: true,
      });
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      accountApiRequest.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
