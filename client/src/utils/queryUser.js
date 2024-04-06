import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries';

export const queryUser = () => {
    const { loading: userLoading, data: userData, refetch } = useQuery(QUERY_ME);
    const userId = userData?.me._id;

    return {userData, userId, refetch};
};