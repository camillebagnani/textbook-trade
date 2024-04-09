import { useQuery } from '@apollo/client'
import SubjectMenu from "../components/SubjectMenu";
import { QUERY_ALL_SUBJECTS } from "../utils/queries";
import Button from 'react-bootstrap/Button';

function SubjectSearch() {
  const { loading: subjectsLoading, data: subjectsData } =
    useQuery(QUERY_ALL_SUBJECTS);
  const subjectData = subjectsData?.subjects || [];
  
  return (
    <div className="graduate-regular text-center">
      <SubjectMenu subjectData={subjectData}></SubjectMenu>
    </div>
  )
}

export default SubjectSearch;