/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {

    var numOfClass = 12;
    var Student = function(name, numOfClass) {
        var self = this;
        self.name = name;
        self.attendanceDay = [];

        for (var index = 0; index < numOfClass; index++) {
            self.attendanceDay[index] = getRandom();
        }

        function getRandom() {
            return (Math.random() >= 0.5);
        }
    }

    var studentModel = {
        students: [],

        init: function() {
            var self = this;
            self.students.push(new Student('Slappy the Frog', numOfClass));
            self.students.push(new Student('Lilly the Lizard', numOfClass));
            self.students.push(new Student('Paulrus the Walrus', numOfClass));
            self.students.push(new Student('Gregory the Goat', numOfClass));
            self.students.push(new Student('Adam the Anaconda', numOfClass));
        }
    }

    var octopus = {
        init: function() {
            studentModel.init();
            studentTableView.init();
        },

        getNumOfClass: function() {
            return numOfClass;
        },

        getStudents: function() {
            return studentModel.students;
        },

        updateStudentAttendance: function(student, attendanceId) {
            student.attendanceDay[attendanceId] = !student.attendanceDay[attendanceId];
        },

        countMissedDay: function(student) {
            return student.attendanceDay.filter(function (attendance) {
                return !attendance;
            }).length;
        }
    };

    var studentTableView = {
        init: function() {
            var self = this;
            self.elemStudentHeader = document.getElementById('header-row');
            self.elemStudentBody = document.getElementById('body-content');

            self.renderHeader();
            self.renderBody();
        },

        renderHeader: function() {
            var self = this;

            var elemStudentNameHeader = document.createElement('th');
            elemStudentNameHeader.className = 'name-col';
            elemStudentNameHeader.innerHTML = 'Student Name';
            self.elemStudentHeader.appendChild(elemStudentNameHeader);

            for (var index = 0; index < octopus.getNumOfClass(); index++) {
                var elemDayHeader = document.createElement('th');
                elemDayHeader.innerHTML = index + 1;
                self.elemStudentHeader.appendChild(elemDayHeader);
            }

            var elemMissedHeader = document.createElement('th');
            elemMissedHeader.className = 'missed-col';
            elemMissedHeader.innerHTML = 'Days Missed-col';
            self.elemStudentHeader.appendChild(elemMissedHeader);
        },

        renderBody: function() {
            var self = this;

            var students = octopus.getStudents();
            students.forEach(function(student) {
                var elemStudentRow = document.createElement('tr');
                elemStudentRow.className = 'student';

                var elemStudentNameCol = document.createElement('td');
                elemStudentNameCol.className = 'name-col';
                elemStudentNameCol.innerText = student.name;
                elemStudentRow.appendChild(elemStudentNameCol);

                var elemMissedCol = document.createElement('td');
                elemMissedCol.className = 'missed-col';
                elemMissedCol.innerText = octopus.countMissedDay(student);

                var id = 0;
                student.attendanceDay.forEach(function(attendance) {
                    var elemAttendanceCol = document.createElement('td');
                    elemStudentNameCol.className = 'attend-col';

                    var elemCheckbox = document.createElement('input');
                    elemCheckbox.type = 'checkbox';
                    if (attendance) {
                        elemCheckbox.setAttribute('checked', true);
                    }
                    elemCheckbox.addEventListener('click', self.tickOrUntick.bind(this, student, id++, elemMissedCol), false);
                    elemAttendanceCol.appendChild(elemCheckbox);

                    elemStudentRow.appendChild(elemAttendanceCol)
                }, this);

                elemStudentRow.appendChild(elemMissedCol);
                self.elemStudentBody.appendChild(elemStudentRow);
            }, this);
        },

        tickOrUntick: function(student, attendanceId, elemMissedCol) {
            var self = this;

            octopus.updateStudentAttendance(student, attendanceId);
            elemMissedCol.innerText = octopus.countMissedDay(student);
        }
    };

    octopus.init();
}());