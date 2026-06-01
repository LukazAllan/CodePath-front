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
import { SectionDTO, LessonDTO, MockCourse} from '../model.js';

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

    let mainElement = main.renderMain(topbarElement);

    let apiCourseResponse = {
        course: new MockCourse({id:1, name:"Trilha Backend Java + Spring Boot"}),
        sections:[
            new SectionDTO(
                {title:'Fundamentos de Backend', subtitle:'Conceitos iniciais do desenvolvimento backend', color:'green', icon:'⚙', ordem:1}
            ),
            new SectionDTO(
                {title:'APIs e Arquitetura', subtitle:'Comunicação entre sistemas e padrões REST', color:'blue', icon:'🌐', ordem:2}
            ),
            new SectionDTO(
                {title:'Spring Boot e Persistência', subtitle:'Persistência de dados e estrutura Java', color:'purple', icon:'🗄', ordem:3}
            )
        ],
        lessons:[
            // remember (sectionId - 1) for its index
            new LessonDTO({sectionId:0, name:'Introdução ao Backend', content:'Conceitos básicos sobre backend, entidades e arquitetura.', ordem:1}),
            new LessonDTO({sectionId:0, name:'Modelagem e Estrutura', content:'Modelagem de entidades, boilerplate e anotações.', ordem:2}),
            new LessonDTO({sectionId:0, name:'Frameworks Java', content:'Introdução ao Spring Boot e Lombok.', ordem:3}),

            new LessonDTO({sectionId:1, name:'APIs REST', content:'Conceitos fundamentais de APIs REST e RESTful.', ordem:1}),
            new LessonDTO({sectionId:1, name:'HTTP e Comunicação', content:'Métodos HTTP, requests e responses.', ordem:2}),
            new LessonDTO({sectionId:1, name:'Arquitetura de Sistemas', content:'Integração entre frontend e backend.', ordem:3}),

            new LessonDTO({sectionId:2, name:'Persistência com JPA', content:'Uso de entidades e banco de dados.', ordem:1}),
            new LessonDTO({sectionId:2, name:'Banco de Dados', content:'Conceitos de SQL, tabelas e relacionamentos.', ordem:2}),
            new LessonDTO({sectionId:2, name:'Boas Práticas Backend', content:'Organização de código e separação em camadas.', ordem:3})
        ]
    };
    //let l

    let screensElement = screens.renderScreen();

    app.appendChild(sidebarElement);
    app.appendChild(mainElement);
}
renderApp();