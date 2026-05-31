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

export class SectionDTO{
    constructor(title, subtitle, color, icon, ordem) {
        this.title = title;
        this.subtitle = subtitle;
        this.color = color;
        this.icon = icon;
        this.ordem = ordem;
    }

    constructor() {
        this.title = undefined;
        this.subtitle = undefined;
        this.color = undefined;
        this.icon = undefined;
        this.ordem = undefined;
    }
}

export class LessonDTO {
    constructor(id, name, content, ordem, active) {
        if (typeof(id) == String) {
            this.id = Number.parseInt(id);
        } else {
            this.id = id;
        }
        this.name = name;
        this.content = content;
        this.ordem = ordem;
        this.active = active;
    }

    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.content = undefined;
        this.ordem = undefined;
        this.active = undefined;
    }
}