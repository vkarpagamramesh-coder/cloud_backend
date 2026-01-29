const db = require('../db');
exports.getStudents = (req, res) => {
    db.query('SELECT * FROM cloud_demo', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
};

exports.addStudent = (req, res) => {
    const { id,name,dob,depart} = req.body;
    const query = 'INSERT INTO cloud_demo (id,name,dob,depart) VALUES (?, ?, ?, ?)';
    db.query(query, [id,name,dob,depart], (err, results) => {
        if (err) {
            console.error('Error adding student:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        } 
            res.status(201).json({
                message: 'Student added successfully',
                id : results.insertedId
             });
        });
 
};

exports.putStudent = (req, res) => {
    const studentId = req.params.id;
    const { name, dob, depart } = req.body;
    const query = 'UPDATE cloud_demo SET name = ?, dob = ?, depart = ? WHERE id = ?';
    db.query(query, [name, dob, depart, studentId], (err, results) => {
        if (err) {
            console.error('Error updating student:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully' });
    });
};
    


exports.deleteStudent = (req, res) => {
    const studentId = req.params.id;        
    db.query('DELETE FROM cloud_demo WHERE id = ?', [studentId], (err, results) => {
        if (err) {
            console.error('Error deleting student:', err.message || err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    });
};
