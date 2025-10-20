package com.kishan.demo.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kishan.demo.Entity.Student;
import com.kishan.demo.Exception.ResourceNotFoundException;
import com.kishan.demo.Repository.StudentRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {
        log.info("Creating new student: {}", student.getName());
        
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new IllegalArgumentException("Student with email " + student.getEmail() + " already exists");
        }
        
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        log.info("Updating student with id: {}", id);
        
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Check if email is being changed and if new email already exists
        if (!student.getEmail().equals(studentDetails.getEmail())) {
            if (studentRepository.existsByEmail(studentDetails.getEmail())) {
                throw new IllegalArgumentException("Student with email " + studentDetails.getEmail() + " already exists");
            }
        }

        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setCourse(studentDetails.getCourse());
        student.setMarks(studentDetails.getMarks());
        student.setCity(studentDetails.getCity());
        
        // Update phone number if provided
        if (studentDetails.getPhoneNumber() != null) {
            student.setPhoneNumber(studentDetails.getPhoneNumber());
        }

        return studentRepository.save(student);
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(Long id) {
        log.info("Fetching student with id: {}", id);
        
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    @Override
    public void deleteStudent(Long id) {
        log.info("Deleting student with id: {}", id);
        
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        
        studentRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getAllStudents(Pageable pageable) {
        log.info("Fetching all students with pagination");
        return studentRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Student> searchStudents(String keyword, Pageable pageable) {
        log.info("Searching students with keyword: {}", keyword);
        
        if (keyword == null || keyword.trim().isEmpty()) {
            return studentRepository.findAll(pageable);
        }
        
        return studentRepository.searchStudents(keyword.trim(), pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getStudentsByCourse(String course, Pageable pageable) {
        log.info("Fetching students by course: {}", course);
        return studentRepository.findByCourseContainingIgnoreCase(course, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getStudentsByCity(String city, Pageable pageable) {
        log.info("Fetching students by city: {}", city);
        return studentRepository.findByCityContainingIgnoreCase(city, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Student> getStudentsByMarksRange(Integer minMarks, Integer maxMarks, Pageable pageable) {
        log.info("Fetching students with marks between {} and {}", minMarks, maxMarks);
        return studentRepository.findByMarksBetween(minMarks, maxMarks, pageable);
    }
}
