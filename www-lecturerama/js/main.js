function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._unitTesting = true; // Unit Testing the features in ApplicationDbContext or not

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.gdm.mmp.lecturerama'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function

            if(this._unitTesting) {
                this.unitTests();
            }
        },
        "unitTests": function() {

            //Unit Testing the Lecturers
            if(this._applicationDbContext.getLecturers() == null) {
                // Create lecturers
                var lecturer = new Lecturer();
                lecturer.FirstName = "Philippe";
                lecturer.SurName = "De Pauw - Waterschoot";
                lecturer.DayOfBirth = new Date(1982, 12, 12);
                lecturer.Email = "philippe.depauw@arteveldehs.be";
                var lecturerAdded = this._applicationDbContext.addLecturer(lecturer);
                console.log(lecturerAdded);

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    console.log(result);
                }

                // Soft delete or undelete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = (lecturer.DeletedAt == null || lecturer.DeletedAt == undefined)?this._applicationDbContext.softDeleteLecturer(lecturer.Id):this._applicationDbContext.softUnDeleteLecturer(lecturer.Id);
                    console.log(result);
                }

                // Delete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = this._applicationDbContext.deleteLecturer(lecturer.Id)
                    console.log(result);
                }
            }

        }
    };

    App.init();
    
});