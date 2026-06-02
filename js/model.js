export class EmailAndPassword {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

export class NewUser {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export class User {
    constructor(id, name, email, hearts, xp) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.hearts = hearts;
        this.xp = xp;
    }
}

export class Course {
    constructor(id, name, description, progress) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.progress = progress; // valor entre 0 e 100
    }
}
export class MockCourse {
    constructor(thisObject) {
        this.id = thisObject.id;
        this.name = thisObject.name;
    }
}

export class MockLesson{
    constructor(name, content, progress){
        this.name = name;
        this.content = content;
        this.progress = progress;
    }
}

export class MockUser {
    constructor(name, email, password, xp, hearts, role, createdAt){
        this.name = name;
        this.email = email;
        this.password = password;
        this.xp = xp;
        this.hearts = hearts;
        this.role = role;
        this.createdAt = createdAt;
    }
}
export class MockSection{
    constructor(title, subtitle, color, icon, ordem, lessons){
        this.title= title;
        this.subtitle = subtitle;
        this.color = color;
        this.icon=icon;
        this.ordem=ordem;
        this.lessons=lessons;
    }
}
export class MockProgress{
    constructor(status, stars, completed, completedAt){
        this.status = status;
        this.stars = stars;
        this.completed = completed;
        this.completedAt = completedAt;
    }
}


export class Enrollment {
    constructor(id, courseId, userId, status) {
        this.id = id;
        this.courseId = courseId;
        this.userId = userId;
        this.status = status; // "active", "completed", "canceled"
    }
}

export class LessonProgress {
    constructor(id, userId, lessonId, status, stars, enrollmentId, completed, completedAt) {
        this.id = id;
        this.userId = userId;
        this.lessonId = lessonId;
        this.status = status;
        this.stars = stars;
        this.enrollmentId = enrollmentId;
        this.completed = completed;
        this.completedAt = completedAt;
    }
}

export class Streak {
    constructor(id, userId, days) {
        this.id = id;
        this.userId = userId;
        this.days = days; // número de dias consecutivos
    }
}

export class SectionDTO{
    constructor(thisObject){
        this.title = thisObject.title;
        this.subtitle = thisObject.subtitle;
        this.color = thisObject.color;
        this.icon = thisObject.icon;
        this.ordem = thisObject.ordem;
    }
}

export class LessonDTO {
    constructor(thisObject){
        this.sectionId = thisObject.sectionId;
        this.name = thisObject.name;
        this.content = thisObject.content;
        this.ordem = thisObject.ordem;
    }
}

export class CourseEntiretyResponseDTO {
    constructor(course, sections, lessons) {
        if (!course.constructor.name === "MockCourse"){
            throw new Error("Course must be anObject.");
        }
        if (!sections.constructor.name === "Array"){
            throw new Error("Sections must be an Array.");
        }
        if (!lessons.constructor.name === "Array"){
            throw new Error("Lessons must be an Array.");
        }
        this.course = new MockCourse(course);
        this.sections = new Array();
        for (let section of sections){
            this.sections.push(
                new SectionDTO(section)
            );
        }
        this.lessons = new Array();
        for (let lesson of lessons){
            this.lessons.push(new LessonDTO(lesson));
        }
    }
}
