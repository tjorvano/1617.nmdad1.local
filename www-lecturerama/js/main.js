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
            } else {
                // Update a lecturer

                // Soft delete or undelete a lecturer

                // Delete a lecturer

            }

        }
    };

    App.init();
    
});
Contact GitHub 