import * as renderer  from './renderer.js';
import * as sidebar    from './sidebar.js';
import * as topbar     from './topbar.js';
import * as screens    from './screens.js';
import * as main       from './main.js';
import * as aprender   from './aprender.js';
import * as profile    from './profile.js';
import * as courses    from './courses.js';
import * as settings   from './settings.js';
import * as loading    from './loading.js';
import * as lesson     from './lessonbase.js';
import * as lessonResult from './lessonResult.js';
import * as catalog    from './catalog.js';
import { SectionDTO, LessonDTO} from '../model.js';

function renderApp(){
    let app = document.querySelectorAll(".app")[0];
    // SIDEBAR
    //let sidebarLogo = sidebar.renderSidebarLogo();
    //let sidebarNav = sidebar.renderSidebarNav();

    let userAvatar = "AL";
    let userName = "Allan Lucas";
    let userLevel = "Lv. 1";

    let sidebarElement = sidebar.renderSidebar(userAvatar, userName, userLevel);

    // MAIN
    let courseName = "Trilha Backend Java + Spring Boot";
    let hearts = 5;
    let xp = 0;
    let topbarElement = topbar.renderTopBar(courseName, hearts, xp);
    
    let screensElement = {};

    let mainElement = main.renderMain(topbarElement)

    let apiCourseResponse = {
        course: {
            id: 1,
            name: "Trilha Backend Java + Spring Boot"
        },
        sections:[
            new SectionDTO(
                'Fundamentos de Backend', 'Conceitos iniciais do desenvolvimento backend', 'green', '⚙', 1
            ),
            new SectionDTO(
                'APIs e Arquitetura', 'Comunicação entre sistemas e padrões REST', 'blue', '🌐', 2
            ),
            new SectionDTO(
                'Spring Boot e Persistência', 'Persistência de dados e estrutura Java', 'purple', '🗄', 3
            )
        ],
        lessons:[
            new LessonDTO()
        ]
    }

    app.appendChild(sidebarElement);
    app.appendChild(mainElement);
}
renderApp();