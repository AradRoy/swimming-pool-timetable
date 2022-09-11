https://github.com/AradRoy/swimming-pool-timetable.git


ADDED CONSTRAINTS:
max in lesson = 5

CONSIDERATIONS
    fewer times you hit the database, the better => nested loop is less expensive
    memory is faster than network

Yotam   all             mon thu         16-20
Yoni    brest buterfly  tue wed thu     08-15
Jonny   all             sun tue thu     10-19


profit = least unsolves
crowded = min avrage kids in lesson

maximum profit aproach: profit -> crowded
    runs:
        fill all groups
            create list of avalable lessons (one hour) = time slots
            filter by pref none, group, grouponly
            fill according to crowded - next kid in the most empty lesson
                in the pol are only lessons with correct style
        fill all private only
            create list of avalable lessons (45 min) = time slots
            filter private only
                ill according to crowded - next kid in the most empty lesson
                in the pol are only lessons with correct style
        fill private perf else put in groups

    evaluate model:
*/

todo:
error handler
validation
algorithim optimization