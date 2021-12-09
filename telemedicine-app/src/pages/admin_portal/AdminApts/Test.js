const [arrApprovedFoS, setApprovedFoS]; //userInfo
const [arrApprovedDoc, setApprovedDoc]; //[]

axios.get('doctors/getDoctorInfo')

data = [doctorUID, docFoS];

data.forEach(e=> {
    if(arrApprovedFoS.includes(e.docFoS)){
        arrApprovedDoc.push(e);
    }
});

arrApprovedDoc.forEach(e=> {
    let id = e.doctorUID;
    Axios.get(`https://telemedicine5a-backend.herokuapp.com/users/getUserInfo/${id}`)
        .then((response) => {
            let data = response.data;
            
            e = [...e,data[0]];

})       }).catch((err) => {
            console.log(err, "Unable to get Patients");
        });    



        e = {
            doctorUID:      "fjkldsa",
            fieldOfStudy: "kfjdsaklghdksja",
        }

        data[0] = {
            userID:     "kjdsfhkgjfdhs",
            firstName:  "Bob",
            lastName:   "marting",
            zip:        "12345-1234",
        }