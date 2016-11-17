/*
ApplicationDbContext
--------------------
1) Database transactions to the database --> localstorage
2) Cache
*/

var ApplicationDbContext = {
    "init": function(strConnection) {
        this._strConnection = strConnection; // Connection string to the key in the localstorage
        this._dbData = {
            "info": {
                "title": "Lecturerama",
                "description": "App for students: See if a lecturer is present",
                "version": "1.0.",
                "modified": "2016-11-17",
                "author": "AHS - GDM - MMP"
            },
            "lecturers": [],
            "timetable": [],
            "settings": []
        }; // JSON-string: The data as value of the previous connection string (key in the localstorage)
        // Save the data in the localstorage. First check if the data is present in the database. If present -> GET THE DATA. If not --> SAVE _dbData in the database
        if(Utils.store(this._strConnection) != null) {
            this._dbData = Utils.store(this._strConnection);
        } else {
            Utils.store(this._strConnection, this._dbData);
        }
    },
    "getLecturers": function() {
        // Get all lecturers
        var lecturers = this._dbData.lecturers;
        if(lecturers == null || (lecturers != null && lecturers.length == 0)) {
            return null;
        }
        return lecturers;
    },
    "getLecturerById": function(id) {
        // Get lecturer by id
        var index = this.findLecturerIndexById(id);
        if(index == -1) {
            return null;
        }
        return this._dbData.lecturers[index];
    },
    "addLecturer": function(lecturer) {
        // Add a new lecturer (CREATE -> DB INSERT)
        if(lecturer != null && (lecturer.Id == undefined || this.getLecturerById(lecturer.Id) == null)) {
            lecturer.Id = Utils.guid();
            lecturer.CreatedAt = new Date().getTime();
            this._dbData.lecturers.push(lecturer);
            this.save();
            return lecturer;
        }
        return null;
    },
    "updateLecturer": function(lecturer) {
        // Update an existing lecturer (UPDATE -> DB UPDATE)
        var index = this.findLecturerIndexById(lecturer.Id);
        if(index == -1) {
            return false;
        }
        lecturer.UpdatedAt = new Date().getTime();
        this._dbData.lecturers[index] = lecturer;
        this.save();
        return true;
    },
    "deleteLecturer": function(id) {
        // Delete an existing lecturer (DELETE -> DB DELETE)
        var index = this.findLecturerIndexById(id);
        if(index == -1) {
            return false;
        }
        this._dbData.lecturers.splice(index, 1);
        this.save();
        return true;
    },
    "softDeleteLecturer": function(id) {
        // Soft Delete an existing lecturer (UPDATE -> DB UPDATE)
        // Field: DeletedAt = Snapshot in time
        var index = this.findLecturerIndexById(id);
        if(index == -1) {
            return false;
        }
        var lecturer =  this._dbData.lecturers[index];
        lecturer.UpdatedAt = new Date().getTime();
        lecturer.DeletedAt = new Date().getTime();
        this._dbData.lecturers[index] = lecturer;
        this.save();
        return true;
    },
    "softUndeleteLecturer": function(id) {
        // Soft UnDelete an existing lecturer (UPDATE -> DB UPDATE)
        // Field: DeletedAt = null
        var index = this.findLecturerIndexById(id);
        if(index == -1) {
            return false;
        }
        var lecturer =  this._dbData.lecturers[index];
        lecturer.UpdatedAt = new Date().getTime();
        lecturer.DeletedAt = null;
        this._dbData.lecturers[index] = lecturer;
        this.save();
        return true;
    },
    "save": function() {
        // Save _dbData into the database (localstorage)
        Utils.store(this._strConnection, this._dbData);
        return true;
    },
    "findLecturerIndexById": function(id) {
        // Find the index of the lecturer by id
        var lecturers = this.getLecturers();
        if(lecturers == null) {
            return -1;
        }

        var match = false, i = 0, lecturer = null;
        while(!match && i < lecturers.length) {
            lecturer = lecturers[i];
            if(lecturer.Id == id) {
                match = true;
            } else {
                i++;
            }
        }

        if(!match) {
            return -1;
        }
        return i;
    }
};