const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const skills = [
    {
        "title": "Frontend",
        "skills": [
            {
                "name": "React Js",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415105/portfolio_assets/prn5op6g9ij4dv31isgk.svg"
            },
            {
                "name": "Redux",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415108/portfolio_assets/fhcdkn0rwsc672qgacec.svg"
            },
            {
                "name": "Next Js",
                "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTklEQVR4Ab1XAaQqURB9DyohSykREpRIQSAlBCoECKUFCSRCBBEAaSEABQEoCIEASCwAUICALgCo83do0//9v819XX845O7VnDkzOzP7JWGaBd3C3IJpQVjAHeJ+Rs9a97vKLGrBsB1KgMhEP3FMUUwt4ENMfxr1yQIU4SSjRkbeOZtERmHk6pXQVDlnkHh9S+QLTm1hkiz4n/gzFQuny9FoFLquE+i34x+n02k0m00UCoV3BIzn3MMJrVYLtp1OJ0cS/X4f5/MZhmG8IyDsWtDfEaDIn2232/3zbrvdxuFwwGg04qRBt+VnETBNE0IIkE2n07/erdfrWK/X6Ha73Hb9ZXII3G43ivy3dNRqtZe7lUoFs9mM6oBDwCQCgquALT1FT3a5XF7qIZ/PYzgcolqtcggIIgBZAgRKB6lCRalp2uM8k8mAVMrlchwC+DEBipycE4n5fP44j8ViKJVKSCaTbAJCpgaez4vFIsjoWa/XA50FAgEkEgmEw2F2CkxZBZ5Br5tt1ITcbjd8Ph88Hg+7CBefECCsVitS4aVJcV9D/VMCVITk/Hq9YrPZyBBo2a1YMGvAcQYcj0cCtWMugcdYNhjDiBrP25mx3++x3W6RzWZZ8isfxzQLlsslJpMJpYY5jhkqcOH1ejEYDDAej9FoNOByuZxGsfqVzC7KTqcDSkkqleKsZOqX8sjkQji8ThCoRC+v78Za7l6JagrUh3YkUuZpqgwDaecc9VYSDoV5Fg+at7n+eLN57kuE/EvzHr/Kvs31aYAAAAASUVORK5CYII="
            },
            {
                "name": "Angular Js",
                "image": "https://camo.githubusercontent.com/8886130b3d8aba95dbdd7c4f9a41029606424cc06d1873c1ced87dd55a222fef/68747470733a2f2f616e67756c61722e696f2f6173736574732f696d616765732f6c6f676f732f616e67756c61722f616e67756c61722e737667"
            },
            {
                "name": "HTML",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415111/portfolio_assets/dsahtyfmyhploielcvu4.png"
            },
            {
                "name": "CSS",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415111/portfolio_assets/gchbdkpuhqciaj1l8mwa.png"
            },
            {
                "name": "JavaScript",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415112/portfolio_assets/pwoi2hflxkdchuoqolxd.png"
            },
            {
                "name": "Bootstrap",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415113/portfolio_assets/sdeayukyowu0khr7b9tz.png"
            },
            {
                "name": "Material UI",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415113/portfolio_assets/f3da070ae8uget0johwb.png"
            },
            {
                "name": "Flutter",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415114/portfolio_assets/cswvkeexmo1yjbbgmnlz.png"
            }
        ]
    },
    {
        "title": "Backend",
        "skills": [
            {
                "name": "Node Js",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415115/portfolio_assets/nau1tgpd0kw8ruydoimu.svg"
            },
            {
                "name": "Express Js",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415117/portfolio_assets/dux9an9w2ftyliu4x6mr.png"
            },
            {
                "name": "Graph Ql",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415118/portfolio_assets/jdnxyuba7vsiyxfl25mf.svg"
            },
            {
                "name": "Python",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415119/portfolio_assets/e5twjms4luq9xkufp3kq.svg"
            },
            {
                "name": "Flask",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415123/portfolio_assets/ljb0v4xdwirsyruozrmt.png"
            },
            {
                "name": "Django",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415123/portfolio_assets/cuqhcfhfmqa0ewxf9p4x.png"
            },
            {
                "name": "MySQL",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415125/portfolio_assets/ofq47zdaqoijwl1esfza.svg"
            },
            {
                "name": "Postgresql",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415127/portfolio_assets/ay4usu8k1pdfwbevtv3l.png"
            },
            {
                "name": "MongoDB",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415128/portfolio_assets/d4dqtlmf3sphl8xhhxo3.svg"
            },
            {
                "name": "Firebase",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415130/portfolio_assets/qyvwqfz6tdeepugfekyf.svg"
            }
        ]
    },
    {
        "title": "DevOps",
        "skills": [
            {
                "name": "AWS",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415131/portfolio_assets/jjnfrx1s5feir4mb0y0f.png"
            },
            {
                "name": "Google Cloud",
                "image": "https://static-00.iconduck.com/assets.00/google-cloud-platform-logo-icon-2048x1824-pg4wzspq.png"
            },
            {
                "name": "Docker",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415132/portfolio_assets/l2vdfffihhv6xeflbsnw.svg"
            },
            {
                "name": "Jenkins",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415137/portfolio_assets/ovuibf6aopmimvpnrs14.png"
            },
            {
                "name": "Nginx",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415138/portfolio_assets/wudbxzftvgudfasumuv0.png"
            },
            {
                "name": "Grafana",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415139/portfolio_assets/zf5r2dnpuyo8hsju48cz.png"
            },
            {
                "name": "Kubernetes",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415140/portfolio_assets/wm6fnivhne5mcs9r6uqi.png"
            },
            {
                "name": "Prometheus",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415140/portfolio_assets/z1gy6oaalzmjeok1uy7y.png"
            }
        ]
    },
    {
        "title": "Android",
        "skills": [
            {
                "name": "Java",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415142/portfolio_assets/bcya7u88hoq1p5rpyveo.svg"
            },
            {
                "name": "Kotlin",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415143/portfolio_assets/wyskeieazygwo1vbzi0c.svg"
            },
            {
                "name": "Jetpack Compose",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415145/portfolio_assets/y9wtasu7hnvbsyyw04op.png"
            },
            {
                "name": "XML",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415145/portfolio_assets/gpi3jzfhi0tolw0td11v.png"
            },
            {
                "name": "Android Studio",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415146/portfolio_assets/kzt05aubhflupfb1vz3u.png"
            }
        ]
    },
    {
        "title": "Machine Learning",
        "skills": [
            {
                "name": "Python",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415119/portfolio_assets/e5twjms4luq9xkufp3kq.svg"
            },
            {
                "name": "Tenserflow",
                "image": "https://static-00.iconduck.com/assets.00/tensorflow-icon-1911x2048-1m2s54vn.png"
            },
            {
                "name": "Keras",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415147/portfolio_assets/ju0azzeol7d0vuehxxag.png"
            },
            {
                "name": "Jupyter",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415148/portfolio_assets/qrzdc4xygeeywqxgyzto.png"
            },
            {
                "name": "Google Colab",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415149/portfolio_assets/xguzajl8ak3k1sq96pgk.png"
            },
            {
                "name": "Sk Learn Kit",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415150/portfolio_assets/xtqx6eposioyatpwkqz5.png"
            }
        ]
    },
    {
        "title": "Others",
        "skills": [
            {
                "name": "Git",
                "image": "https://e7.pngegg.com/pngimages/713/558/png-clipart-computer-icons-pro-git-github-logo-text-logo-thumbnail.png"
            },
            {
                "name": "GitHub",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415151/portfolio_assets/robydplytz6j6xkyxrwo.png"
            },
            {
                "name": "Netlify",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415152/portfolio_assets/o9ho99nao2h9zencqgud.png"
            },
            {
                "name": "VS Code",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415152/portfolio_assets/llvt5ooeejx9ca4rjyvf.png"
            },
            {
                "name": "Postman",
                "image": "https://static-00.iconduck.com/assets.00/postman-icon-497x512-beb7sy75.png"
            },
            {
                "name": "Adobe XD",
                "image": "https://camo.githubusercontent.com/c205ecbe12500177d102169d97bc1c17c545155fdf5ec78c08d54ac53e5b38c1/68747470733a2f2f63646e2e776f726c64766563746f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f61646f62652d78642e737667"
            },
            {
                "name": "Figma",
                "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415154/portfolio_assets/ztb4lug09bv7kxcfxanf.png"
            }
        ]
    }
];

const experiences = [
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415155/portfolio_assets/afyhn5c1qtquc5n8s9sg.jpg",
        "role": "Frontend Engineer Intern",
        "company": "Neurobit",
        "date": "June 2023 - Nov 2023",
        "desc": "Enhanced user experiences on Neurobit PSG & Hybrid, Portals by resolving bugs & reduced load time by 40%. Built Neurobit Analytics portal using React Js with seamless interaction of REST APIs using AXIOS optimized with React Query. Refactored previous code to TypeScript, updated with new dependency and integrated Vite with Jest for Unit Testing.",
        "skills": [
            "ReactJS",
            "Redux",
            "NodeJs",
            "Material UI",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "doc": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415156/portfolio_assets/e2mztuncigire6tlemku.png"
    },
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415157/portfolio_assets/oayxmlugtqaxdcoludlu.jpg",
        "role": "DevOps & Fullstack Engineering Intern",
        "company": "Flipr Inovations Pvt. Ltd.",
        "date": "Aug 2023 - Oct 2023",
        "desc": "Built Flipr Connect Platforms using React Js integrated GraphQL with AXIOS, created High level Design and Figma design. Built Backend with GraphQL and Node JS and connected with MongoDb - Reducing API calls by 20%. Dockerized and automated with Kubernetes & Jenkins CI/CD deployed in AWS-EC2 added Prometheus & Grafana for monitoring.",
        "skills": [
            "Docker",
            "Terraform",
            "AWS",
            "EC2",
            "Portainer",
            "Nginx",
            "JavaScript",
            "TypeScript",
            "Node Js",
            " Next Js"
        ],
        "doc": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415158/portfolio_assets/fvtbgtrlvprf9euhlglh.jpg"
    },
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415159/portfolio_assets/acflnmsejgrm37btptjj.jpg",
        "role": "Android Developer Intern",
        "company": "Rudraksha Welffare Foundation",
        "date": "June 2021 - Oct 2021",
        "desc": "• Built RudraShakti - Astrologer App, with MVVM Architecture using Java and Android Studio integrating Firebase SDK. Created One to One video call integration with Socket.IO and Firebase cloud functions and integrated with Retrofit. Created Low Level Design and converted Figma design to XML code.",
        "skills": [
            "Android",
            "Java",
            "Kotlin",
            "XML",
            "Node Js",
            "Cloud Firestore",
            "Firebase",
            "Figma"
        ],
        "doc": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415160/portfolio_assets/cmnqosrjtsges0bfqs0z.jpg"
    },
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415157/portfolio_assets/oayxmlugtqaxdcoludlu.jpg",
        "role": "Fullstack Externship",
        "company": "Flipr",
        "date": "June 2023 - July 2023",
        "desc": "Built an employee management full stack web app used Docker and deployed on AWS ec2. I was the top performer in the program.",
        "skills": [
            "ReactJS",
            "Redux",
            "NodeJs",
            "Material UI",
            "HTML",
            "CSS",
            "JavaScript",
            "Docker",
            "AWS",
            "MongoDB"
        ],
        "doc": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415161/portfolio_assets/znen6doovv9o1qm6cz5s.jpg"
    },
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415162/portfolio_assets/w5lsffjws5sadycwpf49.jpg",
        "role": "Android Developer",
        "company": "DSC KIIT",
        "date": "Nov2021 - Present",
        "desc": "As an Android developer at the Google Developers Student Club (GDCS), I have had the opportunity to work on exciting projects and collaborate with talented developers who share my passion for technology. Through my involvement with GDCS, I have also had the opportunity to host and participate in numerous events, including hackathons, study jams, and workshops.",
        "skills": [
            "Leadership",
            "Mobile Application Development",
            "Kotlin",
            "XML",
            "Figma"
        ]
    },
    {
        "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415163/portfolio_assets/x9i7jhbpypoboyawutc1.jpg",
        "role": "Open Source Contributor ",
        "company": "GirlScript Summer of Code",
        "date": "May 2023 - Present",
        "desc": "Contributed to different open-source projects and learn from industry experts"
    }
];

const projects = [
    {
        "title": "DecisionHub",
        "date": "Jan 2024 - Dec 2023",
        "description": "A Rule Builder application “Decision Hub” that empowers Business Analysts to create, save, and visualize decision strategies. Provide a no-code rule writing experience and visual representation to test these rules in real-time and observe the calculations at each step.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415164/portfolio_assets/ut0ajuldqmtloeiizx42.jpg",
        "tags": [
            "React Js",
            "PostgressSQL",
            "Node Js",
            "Express Js",
            "Redux",
            "React Flow"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/DecisionHub",
        "webapp": "https://decisionhub.netlify.app/"
    },
    {
        "title": "Trackify",
        "date": "Jun 2023 - Jul 2023",
        "description": "Trackify is a web application designed to streamline task management and enhance productivity in the workplace. It provides a user-friendly interface for employers to keep track of their employees' daily work activities and empowers employees to log their tasks efficiently. \nAdmin Credentials: # Email: testadmin@gmail.com #Password- 123@testadmin, Employee Credentials:\t#Email: testemployee@gmail.com\t#Password- 123@Testemployee",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415165/portfolio_assets/zphndxzjnshrx4srmgyc.png",
        "tags": [
            "Docker",
            "AWS",
            "DuckDNS",
            "Eslint",
            "Husky",
            "CI/CD",
            "React Js",
            "MongoDb",
            "Node Js",
            "Express Js",
            "Redux"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Trackify",
        "webapp": "https://trackify-management.netlify.app/"
    },
    {
        "title": "Podstream",
        "date": "Apr 2023 - May 2023",
        "description": "Developed a full-stack web application that allows users to search for, play, and pause their favorite podcasts on demand and create podcasts. Implemented user authentication using Google Auth and Jwt Auth, made responsive user interface with React JS that provides users with a seamless experience across all devices. Practiced agile methodologies to optimize team efficiency and communication.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415166/portfolio_assets/rhcqkm4cpam52jsaonla.png",
        "tags": [
            "React Js",
            "MongoDb",
            "Node Js",
            "Express Js",
            "Redux"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Podstream",
        "webapp": "https://podstream.netlify.app/",
        "member": [
            {
                "name": "Gagana B M",
                "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415167/portfolio_assets/yxbrblbucxhye7gj0vpw.jpg",
                "linkedin": "https://www.linkedin.com/in/rishav-chanda-b89a791b3/",
                "github": "https://github.com/rishavchanda/"
            },
            {
                "name": "Upasana Chaudhuri",
                "img": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415167/portfolio_assets/rtq6pee60zck6vlhls6x.jpg",
                "linkedin": "https://www.linkedin.com/in/upasana-chaudhuri-2a2bb5231/",
                "github": "https://github.com/upasana0710"
            }
        ]
    },
    {
        "title": "Vexa",
        "date": "Oct 2022 - Jan 2023",
        "description": "Designed and developed the Vexa project, a project management app that helps users and teams stay organized and on track. Implemented key features such as task tracking, team collaboration, and time tracking to improve productivity and project outcomes and also invite team/project members. The plan is to add a community of users where they can find developers and other team members and chat system implementation.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415168/portfolio_assets/gi80smb3zxp8tlo4pshb.png",
        "tags": [
            "React Js",
            "MongoDb",
            "Node Js",
            "Express Js",
            "Redux",
            "NodeMailer"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Project-Management-App",
        "webapp": "https://vexa-app.netlify.app/"
    },
    {
        "title": "Brain Tumor Detection",
        "date": "Jan 2023 - Mar 2023",
        "description": "Preprocessed and augmented the dataset to improve model accuracy, trained the model, created API using model and Python, and used React web app for the project's front end. Achievements: Achieved an accuracy of 99.2% to accurately detect brain tumors from medical images.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415169/portfolio_assets/dkpf8ibomsj7so3sqawe.png",
        "tags": [
            "Python",
            "Keras",
            "TensorFlow",
            "VGG16",
            "Pickle",
            "React"
        ],
        "category": "machine learning",
        "github": "https://github.com/rishavchanda/Brain-Tumor-Detection",
        "webapp": "https://brain-tumor.netlify.app/"
    },
    {
        "title": "Buckoid",
        "date": "Dec 2021 - Apr 2022",
        "description": "App Is Currently In Playstore 100+ Downloads. This Project proposes an “Expense Tracking App”. Keep track of your personal expenses and compare them to your monthly income with the budget planner. It has Google Drive Cloud API for Backup of User Room Database. Made with Kotlin in MVVM Architecture & Live Data.",
        "image": "https://camo.githubusercontent.com/3ad28aa710d18525f1fc87de056ed53c706d09979589bfd5a773df36653bad38/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f6c6f67696e2d65613565322e61707073706f742e636f6d2f6f2f4255434b4f49442532302831292e706e673f616c743d6d6564696126746f6b656e3d32653735376235372d323964372d346263612d613562322d653164346538313432373435",
        "tags": [
            "Kotlin",
            "MVVM",
            "Room Database",
            "Google Drive Cloud API"
        ],
        "category": "android app",
        "github": "https://github.com/rishavchanda/Buckoid-Android-App",
        "webapp": "https://play.google.com/store/apps/details?id=com.rishav.buckoid"
    },
    {
        "title": "Job Finding App",
        "date": "Jun 2023 - Jul 2023",
        "description": "A Job Finding App made with React Native, Axios. Users can search for any job coming from API and apply there.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415171/portfolio_assets/xuw0tkjgi3qvkv4flcjr.png",
        "tags": [
            "React Native",
            "JavaScript",
            "Axios"
        ],
        "category": "android app",
        "github": "https://github.com/rishavchanda/Job-finder-App",
        "webapp": "https://github.com/rishavchanda/Job-finder-App"
    },
    {
        "title": "Whatsapp Clone",
        "date": "Jul 2021",
        "description": "A WhatsApp clone made with React JS, Firebase, and Material UI. It has Phone Authentication, Real-time Database. It has a chat room where users can chat with each other. It has a sidebar where users can see all the chat rooms and can create a new chat room. It has a login page where users can log in with their Google account.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415172/portfolio_assets/spxrmt2nbktsxaryfu0r.png",
        "tags": [
            "React Js",
            "Firebase",
            "Firestore",
            "Node JS"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Whatsapp-Clone-React-Js",
        "webapp": "https://whatsapp-clone-rishav.web.app"
    },
    {
        "title": "Todo Web App",
        "date": "Jun 2021",
        "description": " A Todo Web App made with React JS, Redux, and Material UI. It has a login page where users can log in with their Google account. It has a sidebar where users can see all the tasks and can create a new task. It has a calendar where users can see all the tasks on a particular date. It has a search bar where users can search for a particular task.",
        "image": "https://camo.githubusercontent.com/84ac6ab6f378348ef28d8184062b7e9e3511a1252ae3966eaa49e8e998f732a7/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f746f646f2d6170702d63386331392e61707073706f742e636f6d2f6f2f53637265656e73686f74253230283938292e706e673f616c743d6d6564696126746f6b656e3d33643335646366322d626666322d343730382d393031632d34323238386633",
        "tags": [
            "React Js",
            "Local Storage",
            "AWS Auth",
            "Node JS"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Todo-Web-App",
        "webapp": "https://rishav-react-todo.netlify.app/"
    },
    {
        "title": "Breaking Bad",
        "date": "Jun 2021",
        "description": "A simple react app that shows the characters of the famous TV series Breaking Bad. It uses the Breaking Bad API to fetch the data. It also has a search bar to search for a particular character.",
        "image": "https://camo.githubusercontent.com/937774368308a82419f53dd6eeb4a8675780e119636488b4e3cfe5d34859a72a/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f746f646f2d6170702d63386331392e61707073706f742e636f6d2f6f2f53637265656e73686f7425323028313534292e706e673f616c743d6d6564696126746f6b656e3d65613439383630632d303435362d343333342d616435372d3362393466633033336263",
        "tags": [
            "React Js",
            "API",
            "Axios",
            "Node JS"
        ],
        "category": "web app",
        "github": "https://github.com/rishavchanda/Breaking-Bad",
        "webapp": "https://breaking-bad-webapp.netlify.app"
    },
    {
        "title": "Quiz App",
        "date": "Dec 2020 - Jan 2021",
        "description": "A android quiz app made with Java and Firebase. It has a login page where users can log in with their Google account. It has a sidebar where users can see all the quiz categories and can create a new quiz. It has a leaderboard where users can see the top 10 scorers. It has a search bar where users can search for a particular quiz.",
        "image": "https://res.cloudinary.com/dw6jnhryf/image/upload/v1769415173/portfolio_assets/zrs5stq5smnecrrslyte.gif",
        "tags": [
            "Java",
            "Android Studio",
            "Firebase",
            "Google Auth"
        ],
        "category": "android app",
        "github": "https://github.com/rishavchanda/Quiz-Earn",
        "webapp": "https://github.com/rishavchanda/Quiz-Earn"
    },
    {
        "title": "Face Recognition",
        "date": "Jan 2021",
        "description": "A Face recognition python app made with OpenCV. It uses face_recognition library to detect faces. It uses the webcam to detect faces. It also has a search bar to search for a particular face.",
        "image": "https://dontrepeatyourself.org/media/face-recognition-with-python-dlib-and-deep-learning_cezKZBj.png",
        "tags": [
            "Python",
            "Keras",
            "TensorFlow",
            "VGG16",
            "Pickle",
            "React"
        ],
        "category": "machine learning",
        "github": "https://github.com/rishavchanda/Face-Recodnition-AI-with-Python",
        "webapp": "https://github.com/rishavchanda/Face-Recodnition-AI-with-Python"
    }
];

const seedData = async () => {
    try {
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await Project.deleteMany({});

        await Skill.insertMany(skills);
        await Experience.insertMany(experiences);
        await Project.insertMany(projects);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

seedData();
