import useContract from "./useContract";
import { schooladdress } from "@/config";
import schooljson from '../artifacts/contracts/School.sol/School.json';
import React, { useState } from 'react'
import { ethers } from "ethers";

const useSchoolFunctions = () => {

    const [teacher, setTeacher] = useState("");

    const [students, setStudents] = useState([]);

    const school = useContract(schooladdress, schooljson.abi);

    const addStudent = async (_name) => {
        const txn = await school.addStudent(_name);
        await txn.wait();
        viewAllStudents();
    }

    const viewTeacher = async () => {
        const data = await school.viewTeacher();
        setTeacher(data);
    }

    const viewAllStudents = async () => {
        const data = await school.viewAllStudents();
        setStudents(data);
        console.log(data);
    }

    const payFee = async (_id) => {
        const txn = await school.payFee(_id, { value: ethers.utils.parseEther("2") });
        await txn.wait();
    }

    const enterGrade = async (_id, _grades) => {
        const txn = await school.enterGrade(_id, _grades);
        await txn.wait();
        viewAllStudents();
    }

    const endTerm = async () => {
        const txn = await school.endTerm();
        await txn.wait();
        viewAllStudents();
    }


    return {
        viewTeacher,
        teacher,
        addStudent,
        viewAllStudents,
        students,
        payFee,
        enterGrade,
        endTerm

    }
}

export default useSchoolFunctions
