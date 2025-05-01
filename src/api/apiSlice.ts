import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiConfig from "../Config/Config";
import { getSession } from "next-auth/react";

// Define the base URL
const baseUrl = apiConfig.develpoment.apiBaseUrl;

const customBaseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown>
) => {
    const session = await getSession();
    const token = session?.user?.accessToken;
    const rawBaseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });

    return rawBaseQuery(args, api, extraOptions);
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: customBaseQuery,
    tagTypes: [
        "LocationMaster",
        "ProductMaster",
        "Orders",
        "Orderss",
        "CARRIER_ASSIGNMENTS"
    ],
    endpoints: (builder) => ({
        getLocationMaster: builder.query({
            query: (params) => ({
                url: `masLoc/all-locations`,
                method: "GET",
                params,
            }),
            providesTags: [{ type: "LocationMaster", id: "LIST" }],
        }),

        getAllProducts: builder.query({
            query: (params) => ({
                url: `masterProducts/all-products`,
                method: "GET",
                params,
            }),
            providesTags: [{ type: "ProductMaster", id: "LIST" }],
        }),

        getOrderById: builder.query({
            query: ({ orderId }) => ({
                url: `order/order-by-id`,
                method: "GET",
                params: { order_ID: orderId },
            }),
            providesTags: [{ type: "Orders", id: "LIST" }, { type: "Orderss", id: "LIST" }],
        }),

        getAssignedOrderById: builder.query({
            query: (params) => ({
                url: `ao/assigned-order`,
                method: "GET",
                params,
            }),
        }),

        getCarrierAssignmentReq: builder.query({
            query: (params) => ({
                url: `carrier-assignment/carrier-assignments`,
                method: "GET",
                params,
            }),
            providesTags: [{ type: "Orderss", id: "LIST" }]
        }),

        postCarrierRejectigOrder: builder.mutation({
            query: (body) => ({
                url: "carrier-assignment/carrier-assignment/reject",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Orderss", id: "LIST" }]
        }),

        postCarrierAssigningOrderConfirm: builder.mutation({
            query: (body) => ({
                url: "carrier-assignment/carrier-assignment/confirm",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Orderss", id: "LIST" }]
        }),

        getCarrierAssignments: builder.query({
            query: (carrierId) => ({
                url: `carrier-assignment/assignment?carrier_ID=${carrierId}`,
                method: "GET",
            }),
            providesTags: [{ type: "CARRIER_ASSIGNMENTS", id: "LIST" }],
        }),


    }),

});

export const { 
    useGetLocationMasterQuery,
    useGetAllProductsQuery,
    useGetOrderByIdQuery,
    useGetAssignedOrderByIdQuery,
    useGetCarrierAssignmentReqQuery,
    usePostCarrierRejectigOrderMutation,
    usePostCarrierAssigningOrderConfirmMutation,
    useGetCarrierAssignmentsQuery
} = apiSlice;
