import {useEffect, useState} from 'react';
import useWallet from '@/hooks/useWallet';
import useSchoolFunctions from '@/hooks/useSchoolFunctions';

const index = () => {

  const {wallet} = useWallet();

  const {viewTeacher, teacher, addStudent, viewAllStudents, students, payFee, enterGrade, endTerm} = useSchoolFunctions();

  const [studentName, setStudentName] = useState("");
  const [studentNo, setStudentNo] = useState(0);
  const [grades, setGrades] = useState([]);
  
  const handleInputChange = (event) =>{
    const { value } = event.target;
    const notlar = value.split(",");
    setGrades(notlar);
  }

  useEffect(() => {
    wallet.connect();
    if(wallet.address){
      viewTeacher();
      viewAllStudents();
    }
  }, [wallet.address])

  return (
    <>
      {wallet.address.toLowerCase() == teacher.toLowerCase() ?      
      <div>
        <h2><i>Teacher Page:</i></h2>
        <p>Add Student: 
          <input placeholder='Student Name' onChange={(e) => setStudentName(e.target.value)}/>
          <button onClick={() => addStudent(studentName)} >  Submit  </button>
        </p>
        <table>
          <thead>
            <tr>
              <th>  ID  </th>
              <th>  Name  </th>
              <th>  Grades  </th>
              <th>  Term  </th>
              <th>  Paid  </th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, i) =>(
              <tr key={student.ID}>
                <td>  {student.ID.toNumber()}  </td>
                <td>  {student.name}  </td>
                <td>(
                  {student.grades[0].toNumber()} ,
                  {student.grades[1].toNumber()} ,
                  {student.grades[2].toNumber()} )
                </td>
                <td>  {student.term.toNumber()}  </td>
                <td>  {student.isPaid.toString()}  </td>
                <td>  <input placeholder='Grades' onChange={handleInputChange}/> <button onClick={() => enterGrade(student.ID, grades)} >SET GRADES</button> </td>
              </tr>      
            ))}
          </tbody>
        </table>
        <button onClick={endTerm}>END TERM</button>
      </div>:
      <div>
        <h2><i>Student Page:</i></h2>
        <p>
          <input placeholder='Student NO' type={"number"} onChange={(e) => setStudentNo(e.target.value)} /> 
          <button onClick={() => payFee(studentNo)}> MAKE PAYMENT  </button>
        </p>
      </div>
      }
    </>
  )
}

export default index

