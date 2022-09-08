import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize } from "serializr";
import { useState } from "react";
import { UserModel } from "../../models/donors.model";
import { generatePath } from "react-router-dom";
import { PaginationModel } from "../../models/pagination.model";

const AreaRepService = () => {

    const [areaRepLoading, setAreaRepLoading] = useState<boolean>(false);
    const [areaRepList, setAreaRepList] = useState<UserModel[]>([]);
    const [repPagination, setRepPagination] = useState<PaginationModel>();

    const fetchAreaRepList = async (params: {
        search?: string
        limit?: number
        page?: number
    } = {}) => {
        try {
            params.limit = 50
            setAreaRepLoading(true);
            const { data } = await axiosInstance.get(ApiRoutes.AREA_REPRESENTATIVES, { params });
            const areaReps: any = deserialize(UserModel, data['area_representatives']);
            setAreaRepList(areaReps);
            setRepPagination(deserialize(PaginationModel, data))
        } catch (error) {
            console.log("rep list", error)
        } finally {
            setAreaRepLoading(false);
        }
    };

    const fetchNearbyAreaRepList = async (donorId: number) => {
        try {
            setAreaRepLoading(true);
            const { data } = await axiosInstance.get(generatePath(ApiRoutes.AREA_REPRESENTATIVES));
            const areaReps: any = deserialize(UserModel, data['area_representatives']);
            setAreaRepList(areaReps);
        } catch (error) {
            console.log("donor rep list", error)
        } finally {
            setAreaRepLoading(false);
        }
    };

    return {
        fetchAreaRepList,
        repPagination,
        areaRepList,
        areaRepLoading,
        fetchNearbyAreaRepList
    }
}

export default AreaRepService;