//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract School{

    uint termFee;

    address public teacher;

    constructor(uint _termFee) {
        termFee = _termFee;

        teacher = msg.sender;
    }

    struct Student {
        uint ID;
        string name;
        uint[] grades;
        uint term;
        bool isPaid;
    }

    mapping(uint => Student) public idToStudents;

    uint StudentCount;

    function addStudent(string calldata _name) public onlyTeacher{
        StudentCount++;
        Student memory student = Student({
            ID: StudentCount,
            name: _name,
            grades: new uint[](3),
            term: 1,
            isPaid: false
        });
        idToStudents[StudentCount] = student;
    }

    function enterGrade(uint _id, uint[3] calldata _grades) external onlyTeacher{
        idToStudents[_id].grades = _grades;
    }

    function payFee(uint _id) public payable{
        require(msg.value >= termFee);
        idToStudents[_id].isPaid = true;
        if(msg.value > termFee){
            uint exceedValue;
            unchecked {
                exceedValue = msg.value - termFee;
            }
            payable(msg.sender).transfer(exceedValue);
        }
    }

    function endTerm() public onlyTeacher{
        for(uint i = 1; i < StudentCount + 1; i++){
            uint total;
            for(uint j = 0; j < 3; j++){
                total += idToStudents[i].grades[j];
            }
            uint avg = total / 3;
            if(avg >= 50 && idToStudents[i].isPaid == true){
                idToStudents[i].term++;
            }
            idToStudents[i].isPaid = false;
            idToStudents[i].grades = new uint[](3);
        }
    }

    function viewAllStudents() public view returns (Student[] memory){
        Student[] memory studentArr = new Student[](StudentCount);
        uint currentIndex = 0;
        for (uint i = 1; i < StudentCount + 1; i++){
            studentArr[currentIndex] = idToStudents[i];
            currentIndex++;
        }
        return studentArr;
    }

    function viewStudent(uint _id)  public view returns(Student memory){
        return idToStudents[_id];
    }

    function viewTeacher() public view returns(address){
        return teacher;
    }

    modifier onlyTeacher() {
        require(teacher == msg.sender);
        _;
    }
}