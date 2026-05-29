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

export class Enrollment {
    constructor(id, courseId, userId, status) {
        this.id = id;
        this.courseId = courseId;
        this.userId = userId;
        this.status = status; // "active", "completed", "canceled"
    }
}

export class LessonProgress {
    constructor(id, enrollmentId, lessonId, completed) {
        this.id = id;
        this.enrollmentId = enrollmentId;
        this.lessonId = lessonId;
        this.completed = completed; // boolean
    }
}

export class Streak {
    constructor(id, userId, days) {
        this.id = id;
        this.userId = userId;
        this.days = days; // número de dias consecutivos
    }
}