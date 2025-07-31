import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers";


export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!accessToken && !refreshToken) {
    return Response.json(
      {
        message: "Khong nhan duoc RF hoac TF",
      },
      {
        status: 200,
      }
    );
  }
  try {
    const result = await authApiRequest.sLogout({
      accessToken: accessToken || "",
      refreshToken: refreshToken || ""
    })
    return Response.json(result.payload)
  } catch (error) {
    return Response.json({
      message: "Loi server"
    },
  {
    status: 200
  })
  }
}
