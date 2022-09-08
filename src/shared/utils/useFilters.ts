import { removeFalsyKeys } from './removeFalsyKeys';
import { useLocation, useNavigate } from 'react-router-dom';

const useFilters = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const paramString = location.search

    const getParams = (keys: string[]) => {
        const params: any = {}
        keys?.forEach(key => {
            const value = new URLSearchParams(paramString).get(key)
            params[key] = Number(value) || value
        })
        return params
    }

    const setParams = (filters: any) => {
        const params = new URLSearchParams(removeFalsyKeys(filters))
        navigate(location.pathname,{replace:true})
       
    }

    return {
        location,
        getParams,
        setParams,
    }
}

export default useFilters