(function() {
  'use strict';

  if (!window.appData) {
    window.appData = { courses: [], comparisonData: [] };
  }

// Make data globally accessible
var courses = window.appData ? window.appData.courses : [];
var comparisonData = window.appData ? window.appData.comparisonData : [];

const resourcesData = {
  pdf: [
    {name:"Networking Basics Certificate",desc:"Certifikat nätverksgrunder",file:"Kurs 1 - Nätverksteknik/Networking_Basics_certificate_mattias-englund1992-gmail-com_1a3d60bf-8092-4d89-b7ac-63c03887e12d.pdf",course:"Kurs 1"},
    {name:"Inlämning Python",desc:"Python-inlämningsuppgift: while, for, if",file:"Kurs 1 - Nätverksteknik/Inlämningsuppgift Python - while, for and if.pdf",course:"Kurs 1"},
    {name:"Tydligt och tekniskt",desc:"Kommunikation och presentationsteknik",file:"Kurs 1 - Nätverksteknik/Tydligt och tekniskt.pdf",course:"Kurs 1"},
    {name:"Hemmastudier vecka 1-2",desc:"Nätverksteknik hemmastudier",file:"Kurs 1 - Nätverksteknik/Nätverksteknik  Hemmastudier vecka 1 & 2.pdf",course:"Kurs 1"},
    {name:"Hemmastudier vecka 41",desc:"Nätverksteknik hemmastudier vecka 41",file:"Kurs 1 - Nätverksteknik/Nätverksteknik  Hemmastudier vecka 41.pdf",course:"Kurs 1"},
    {name:"Studieguide inför tentamen",desc:"Sammanfattande studieguide för hela kursen",file:"StudieGuide/STUDIEGUIDE INFÖR TENTAMEN - NÄTVERKSTEKNIK.pdf",course:"Kurs 1"},
    {name:"Studieguide utförlig",desc:"Detaljerad genomgång av alla ämnen",file:"StudieGuide/studieguide_uttommande.pdf",course:"Allmän"},
    {name:"Networking Guide Final",desc:"Omfattande guide routing och switching",file:"Kurs 2 - Routing och Switching/networking_guide_final.pdf",course:"Kurs 2"},
    {name:"Leaf-Spine Guide",desc:"Leaf-spine arkitektur och design",file:"Kurs 2 - Routing och Switching/leaf-spine-guide-v2.pdf",course:"Kurs 2"},
    {name:"Kursplanering Routing & Switching",desc:"Kursplan för routing och switching",file:"Kurs 2 - Routing och Switching/Kursplanering_ Routing och Switching.pdf",course:"Kurs 2"},
    {name:"Virtuell nätverksteknik från bilder",desc:"Visuell guide till virtuell nätverksteknik",file:"Kurs 3 - Virtuell och molnbaserad nätverksteknik/Virtuell och molnbaserad nätverksteknik från bilder.pdf",course:"Kurs 3"},
    {name:"Dag 5 material",desc:"Föreläsningsmaterial dag 5",file:"Kurs 3 - Virtuell och molnbaserad nätverksteknik/Dag5.pdf",course:"Kurs 3"},
    {name:"Diagnostiskt prov",desc:"Diagnostiskt prov virtuell nätverksteknik",file:"Kurs 3 - Virtuell och molnbaserad nätverksteknik/diagnostiskt-prov.pdf",course:"Kurs 3"},
    {name:"Kursplanering Virtuell & Moln",desc:"Kursplan för virtuell och molnbaserad nätverksteknik",file:"Kurs 3 - Virtuell och molnbaserad nätverksteknik/Kursplanering_ Virtuell och molnbaserad nätverksteknik.pdf",course:"Kurs 3"},
    {name:"Säker nätverksteknik",desc:"-versikt säker nätverksteknik",file:"Kurs 4 - Säker nätverksteknik/säker nätverks.pdf",course:"Kurs 4"},
    {name:"DMZ Design",desc:"DMZ och perimeter security",file:"Kurs 4 - Säker nätverksteknik/DMZ.pdf",course:"Kurs 4"},
    {name:"Packet Tracer Labbar Del 1",desc:"Packet Tracer laborationer del 1",file:"Kurs 4 - Säker nätverksteknik/packet_tracer_labbar_del1.pdf",course:"Kurs 4"},
    {name:"Packet Tracer Labbar Del 2",desc:"Packet Tracer laborationer del 2",file:"Kurs 4 - Säker nätverksteknik/packet_tracer_labbar_del2.pdf",course:"Kurs 4"},
    {name:"Packet Tracer Labbar Del 3",desc:"Packet Tracer laborationer del 3",file:"Kurs 4 - Säker nätverksteknik/packet_tracer_labbar_del3.pdf",course:"Kurs 4"},
    {name:"2xASA5540",desc:"Cisco ASA 5540 konfiguration",file:"Kurs 4 - Säker nätverksteknik/2xASA5540.pdf",course:"Kurs 4"},
    {name:"Studieanteckningar Säkerhet",desc:"Nätverkssäkerhet, kryptografi & kursöversikt",file:"Kurs 4 - Säker nätverksteknik/Studieanteckningar_ Nätverkssäkerhet, Kryptografi & Kursöversikt.pdf",course:"Kurs 4"},
    {name:"Studieanteckningar Säkerhet 2",desc:"Nätverkssäkerhet, yrkesroller & molntjänster",file:"Kurs 4 - Säker nätverksteknik/Studieanteckningar_ Nätverkssäkerhet, Yrkesroller & Molntjänster.pdf",course:"Kurs 4"},
    {name:"Studieanteckningar SASE",desc:"Varför SASE?",file:"Kurs 4 - Säker nätverksteknik/Studieanteckningar_ Varför SASE.pdf",course:"Kurs 4"},
    {name:"Kursplanering Säker nätverksteknik",desc:"Kursplan för säker nätverksteknik",file:"Kurs 4 - Säker nätverksteknik/Kursplanering_ Säker nätverksteknik.pdf",course:"Kurs 4"},
    {name:"Hemuppgift Projekt",desc:"Hemuppgift projektarbete",file:"Kurs 6 - Projektarbete/Hemuppgift.pdf",course:"Kurs 6"},
    {name:"Studieguide Routing & Switching",desc:"Studieguide för routing och switching",file:"StudieGuide/Studieguide_Routing_Switching.pdf",course:"Kurs 2"},
    {name:"Studieguide SASE",desc:"Studieguide för SASE",file:"StudieGuide/studieguide_sase.pdf",course:"Kurs 4"},
    {name:"Studieguide Dag 1 Teknisk Kommunikation",desc:"Studieguide för teknisk kommunikation",file:"StudieGuide/Studieguide_Dag1_Teknisk_Kommunikation.pdf",course:"Kurs 5"},
    {name:"Studiehandledning",desc:"Allmän studiehandledning",file:"StudieGuide/studiehandledning.pdf",course:"Allmän"},
    {name:"The Way of the Cloud",desc:"Guide till molnet",file:"StudieGuide/the-way-of-the-cloud.pdf",course:"Kurs 3"},
    {name:"The Way of the Virtual Machine",desc:"Guide till virtuella maskiner",file:"StudieGuide/the_way_of_the_virtual_machine.pdf",course:"Kurs 3"},
    {name:"Virtual Enlightenment",desc:"Fördjupning virtualisering",file:"StudieGuide/virtual_enlightenment.pdf",course:"Kurs 3"},
    {name:"Zen Studiehandledning",desc:"Studiehandledning",file:"StudieGuide/zen_studiehandledning_änna.pdf",course:"Allmän"}
  ],
  image: [
    {name:"Network Basics Overview",desc:"-versiktsbild över nätverksgrunder",file:"Kurs 1 - Nätverksteknik/networking-basics.png",course:"Kurs 1"}
  ],
  audio: [
    {name:"Subnetting Lecture",desc:"Föreläsning om subnätning",file:"Kurs 1 - Nätverksteknik/Subnätning_Från_Kaos_Till_Ordning.m4a",course:"Kurs 1"},
    {name:"MAC, IP and ARP",desc:"Föreläsning om MAC, IP och ARP",file:"Kurs 1 - Nätverksteknik/IP_MAC_och_ARP_hur_enheter_hittar_varandra.m4a",course:"Kurs 1"},
    {name:"DNS and TCP",desc:"Föreläsning om DNS och TCP",file:"Kurs 1 - Nätverksteknik/DNS_TCP_och_nätverkets_koreografi.m4a",course:"Kurs 1"},
    {name:"MAC, IP and Routing",desc:"Föreläsning om routingprotokoll",file:"Kurs 1 - Nätverksteknik/MAC_IP_ARP_och_routingprotokoll.m4a",course:"Kurs 1"},
    {name:"Networking Fundamentals",desc:"Grundläggande nätverksteknik",file:"Kurs 1 - Nätverksteknik/Networking_Fundamentals_MAC_IP_Subnets_Routing.m4a",course:"Kurs 1"},
    {name:"IP-nätverket från MAC till Zero Trust",desc:"Från MAC-adress till Zero Trust-säkerhet",file:"Kurs 1 - Nätverksteknik/IP-nätverket_från_MAC-adress_till_Zero_Trust.m4a",course:"Kurs 1"},
    {name:"MAC and IP Dual Identity",desc:"MAC och IP dual identity förklarat",file:"Kurs 1 - Nätverksteknik/MAC_and_IP_Dual_Identity_Explained.m4a",course:"Kurs 1"},
    {name:"MAC-adresser IP-routing Zero Trust",desc:"MAC-adresser, IP-routing och Zero Trust",file:"Kurs 1 - Nätverksteknik/MAC-adresser_IP-routing_och_Zero_Trust.m4a",course:"Kurs 1"},
    {name:"Network Data Flow",desc:"Network data flow från MAC till BGP",file:"Kurs 1 - Nätverksteknik/Network_Data_Flow_From_MAC_to_BGP.m4a",course:"Kurs 1"},
    {name:"Routerns beslut AD och Metric",desc:"Administrative Distance och Metric",file:"Kurs 2 - Routing och Switching/Routerns_beslut_Administrative_Distance_och_Metric.m4a",course:"Kurs 2"},
    {name:"Så fungerar nätverk BGP och Zero Trust",desc:"BGP och Zero Trust förklarat",file:"Kurs 2 - Routing och Switching/Så_fungerar_nätverk_BGP_och_Zero_Trust.m4a",course:"Kurs 2"},
    {name:"MPLS VPN QoS Zero Trust",desc:"MPLS, VPN, QoS och Zero Trust",file:"Kurs 2 - Routing och Switching/MPLS_VPN_QoS_och_Zero_Trust_förklarat.m4a",course:"Kurs 2"},
    {name:"Från IP-adresser till Zero Trust",desc:"Säkerhet från IP till Zero Trust",file:"Kurs 4 - Säker nätverksteknik/Från_IP-adresser_till_Zero_Trust_säkerhet.m4a",course:"Kurs 4"}
  ],
  doc: [
    {name:"Exempeltenta Routing & Switching 1",desc:"Exempeltenta routing och switching",file:"Kurs 2 - Routing och Switching/Exempeltenta_Routing_Switching.docx",course:"Kurs 2"},
    {name:"Exempeltenta Routing & Switching 2",desc:"Exempeltenta routing och switching",file:"Kurs 2 - Routing och Switching/Exempeltenta_Routing_Switching_2.docx",course:"Kurs 2"},
    {name:"Lab 1 - Konfigurera Routrar med NAT",desc:"Laborationsinstruktion NAT",file:"Kurs 2 - Routing och Switching/LAB 1_ Konfigurera Routrar med NAT.docx",course:"Kurs 2"},
    {name:"Kursplanering Kurs 1",desc:"Kursplaneringsmall",file:"Kurs 1 - Nätverksteknik/Kursplaneringsmall Jensen YH NT25G_NT.docx",course:"Kurs 1"},
    {name:"Kursplanering Kurs 2",desc:"Kursplaneringsmall",file:"Kurs 2 - Routing och Switching/Kursplaneringsmall Jensen YH NT25G_RS.docx",course:"Kurs 2"},
    {name:"Kursplanering Kurs 3",desc:"Kursplaneringsmall",file:"Kurs 3 - Virtuell och molnbaserad nätverksteknik/Kursplaneringsmall Jensen YH NT25G_VMT.docx",course:"Kurs 3"},
    {name:"Kursplanering Kurs 4",desc:"Kursplaneringsmall säkerhet",file:"Kurs 4 - Säker nätverksteknik/Kursplaneringsmall Jensen YH NT25G_SNT.docx",course:"Kurs 4"},
    {name:"NordTech Grupparbete",desc:"Grupparbete NordTech säkerhet",file:"Kurs 4 - Säker nätverksteknik/NordTech - Grupparbete.docx",course:"Kurs 4"},
    {name:"Rapport Pentest Lab",desc:"Penetrationstest rapport",file:"Kurs 4 - Säker nätverksteknik/rapport-pentest-lab.docx",course:"Kurs 4"},
    {name:"ACL Regler",desc:"ACL regelverk",file:"Kurs 4 - Säker nätverksteknik/ACL Regler.xlsx",course:"Kurs 4"},
    {name:"DREAD Hotmodellering",desc:"DREAD-bedömning HealthFirst",file:"Kurs 4 - Säker nätverksteknik/DREAD-bedömning av HealthFirst-hot.xlsx",course:"Kurs 4"},
    {name:"SASE-lösning HealthFirst",desc:"SASE-lösning för HealthFirsts säkerhet",file:"Kurs 4 - Säker nätverksteknik/SASE-lösning för HealthFirsts säkerhet.xlsx",course:"Kurs 4"},
    {name:"STRIDE & DREAD",desc:"Hotmodellering & riskbedömning",file:"Kurs 4 - Säker nätverksteknik/STRIDE & DREAD_ Hotmodellering och Riskbedömning.xlsx",course:"Kurs 4"},
    {name:"Studieguide Rapportskrivning",desc:"Guide för rapportskrivning",file:"StudieGuide/Studieguide_Rapportskrivning.docx",course:"Kurs 5"},
    {name:"Studieguide SIEM",desc:"Guide för SIEM",file:"StudieGuide/Studieguide_SIEM.docx",course:"Kurs 4"},
    {name:"Projektplan",desc:"Projektplan med tidsbuffert och arbetsfördelning",file:"Kurs 6 - Projektarbete/Projektplan med Tidsbuffert och Arbetsfördelning.xlsx",course:"Kurs 6"},
    {name:"LIA-rapport",desc:"Rapport från LIA-perioden",file:"Kurs 7 - Lärande i arbete (LIA)/LIA-rapport.docx",course:"Kurs 7"},
    {name:"LIA-plan",desc:"LIA-plan nätverk och säkerhet",file:"Kurs 7 - Lärande i arbete (LIA)/LIA-plan_ Nätverk & Säkerhet.xlsx",course:"Kurs 7"},
    {name:"Mall LIA-rapport",desc:"Mall för LIA-rapport",file:"Kurs 7 - Lärande i arbete (LIA)/Mall LIA rapport Jensen YH (13) (6).docx",course:"Kurs 7"}
  ],
  books: [
    {name:"CCNA 200-301 Official Cert Guide Vol 2",desc:"Cisco CCNA certifieringsguide (61 MB)",file:"Böcker/CCNA 200-301 Official Cert Guide Volume 2, Second Edition.pdf",course:"Allmän"},
    {name:"Cisco Networking Academy CCNA 1-2",desc:"Cisco Networking Academy lärobok (21 MB)",file:"Böcker/Cisco Networking Academy Program CCNA 1 and 2 companion guide.pdf",course:"Allmän"}
  ],
  websites: [
    {name:"Atlassian - 5 Whys",desc:"Guide till 5 Whys-metoden för problemlösning",file:"Agilt & Process",course:"Allmän",url:"https://www.atlassian.com/team-playbook/plays/5-whys"},
    {name:"Cisco Learning Network - Topologier",desc:"Guide till two-tier, three-tier och spine-leaf designs",file:"Nätverk & Arkitektur",course:"Kurs 2",url:"https://learningnetwork.cisco.com/s/question/0D56e0000EBtd2dCQB/a-guide-to-simple-twotier-threetier-and-spineleaf-designs"},
    {name:"GitHub - TripleTier-Network",desc:"Projekt med implementation av treskiktsnätverk",file:"Nätverk & Arkitektur",course:"Kurs 2",url:"https://github.com/ShivamPandey4X/TripleTier-Network"},
    {name:"IT-läraren",desc:"Dator och nätverksteknik",file:"Nätverk & Arkitektur",course:"Allmän",url:"https://itlararen.se/daodac0.html"},
    {name:"NetAcad Resource Hub",desc:"Packet Tracer, virtuella maskiner och mer",file:"Nätverk & Arkitektur",course:"Allmän",url:"https://www.netacad.com/resources/lab-downloads?courseLang=en-US"},
    {name:"VLAN Guide",desc:"Understanding and Configuring VLANs",file:"Nätverk & Arkitektur",course:"Kurs 2",url:"https://blog.muffn.io/posts/understanding-and-configuring-vlans/"},
    {name:"Dag 1 - Gist",desc:"Dag 1 arbetsmaterial",file:"Projekt & Skola",course:"Allmän",url:"https://gist.github.com/saldestechnology/730ef5744cdda8b0dda1246b8fecbc9f"},
    {name:"Eigengrau - Figma Slides",desc:"Figma presentationsslide",file:"Projekt & Skola",course:"Allmän",url:"https://www.figma.com/slides/rGVzAbq7qBDglYCCKFEVXU/Eigengrau?node-id=8-124"},
    {name:"GitHub - johanlarar/driftsatta",desc:"Driftsättningsrepository",file:"Projekt & Skola",course:"Allmän",url:"https://github.com/johanlarar/driftsatta/tree/main"},
    {name:"Målgruppsanalys - Gist",desc:"Målgruppsanalys mall",file:"Projekt & Skola",course:"Kurs 5",url:"https://gist.github.com/saldestechnology/1017d92ef3162811c3ad7963b518b492"},
    {name:"Behovsanalys - Gist",desc:"Behovsanalys mall",file:"Projekt & Skola",course:"Kurs 6",url:"https://gist.github.com/saldestechnology/e61ca39840956412b154ecb923843efb"},
    {name:"NordTech Solutions - Gist",desc:"NordTech solutions uppdrag",file:"Projekt & Skola",course:"Allmän",url:"https://gist.github.com/saldestechnology/f63099235cff4c91253528e369ae7724"},
    {name:"SASE-uppgift - Gist",desc:"SASE uppgiftsbeskrivning",file:"Projekt & Skola",course:"Kurs 4",url:"https://gist.github.com/johanlarar/c9b71fbc9467f98a0372cee4006f4017"},
    {name:"YML - Gist",desc:"YAML konfiguration",file:"Projekt & Skola",course:"Allmän",url:"https://gist.github.com/saldestechnology/5a19a9ed64d605c6260876ae5d356889"},
    {name:"Python Tips - Map/Filter/Reduce",desc:"Python tips map, filter och reduce",file:"Python & Kod",course:"Allmän",url:"https://book.pythontips.com/en/latest/map_filter.html"},
    {name:"Python Docs - Built-in Functions",desc:"Python inbyggda funktioner",file:"Python & Kod",course:"Allmän",url:"https://docs.python.org/3/library/functions.html"},
    {name:"Mastering Python Networking",desc:"PDF-bok om Python-nätverk",file:"Python & Kod",course:"Allmän",url:"https://repo.tzku.at/book/dev/python/masteringpythonnetworking.pdf"},
    {name:"Stack Overflow",desc:"Senaste frågor på Stack Overflow",file:"Python & Kod",course:"Allmän",url:"https://stackoverflow.com/questions"},
    {name:"freeCodeCamp Python",desc:"Python for Everybody kurs",file:"Python & Kod",course:"Allmän",url:"https://www.freecodecamp.org/learn/python-for-everybody/python-for-everybody/introduction-why-program"},
    {name:"W3Schools Python Tutorial",desc:"Python tutorial",file:"Python & Kod",course:"Allmän",url:"https://www.w3schools.com/python/"},
    {name:"VS Code",desc:"Visual Studio Code - AI code editor",file:"Python & Kod",course:"Allmän",url:"https://code.visualstudio.com/"},
    {name:"NIST SP 800-115",desc:"Technical Guide to Information Security Testing",file:"Säkerhet & Pentesting",course:"Kurs 4",url:"https://csrc.nist.gov/pubs/sp/800/115/final"},
    {name:"Hack The Box",desc:"Community-driven pentest plattform",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://www.hackthebox.com/"},
    {name:"Dataintrång - lagen.nu",desc:"Lagtext om dataintrång",file:"Säkerhet & Pentesting",course:"Kurs 4",url:"https://lagen.nu/begrepp/Dataintr%C3%A5ng"},
    {name:"DREAD Threat Modeling",desc:"Guide till DREAD hotmodellering",file:"Säkerhet & Pentesting",course:"Kurs 4",url:"https://threat-modeling.com/dread-threat-modeling/"},
    {name:"DVWA - GitHub",desc:"Damn Vulnerable Web Application",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://github.com/digininja/DVWA"},
    {name:"Pentest Lab - GitHub",desc:"Laborationsmiljö för pentesting",file:"Säkerhet & Pentesting",course:"Kurs 4",url:"https://github.com/saldes-education/pentest-lab"},
    {name:"Shadow Syndicate CTF",desc:"CTF-utmaningar",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://github.com/saldestechnology/shadow-syndicate-ctf"},
    {name:"Nmap Version Detection",desc:"Service and version detection med Nmap",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://nmap.org/book/man-version-detection.html"},
    {name:"TryHackMe - Pre Security",desc:"Offensive security introduktion",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://tryhackme.com/room/offensivesecurityintro?path=presecurity"},
    {name:"Wireshark Download",desc:"Ladda ner Wireshark",file:"Säkerhet & Pentesting",course:"Allmän",url:"https://www.wireshark.org/download.html"},
    {name:"Z-Library",desc:"Världens största e-bok bibliotek",file:"-vrigt",course:"Allmän",url:"https://1lib.sk/"},
    {name:"KWTrain Webcast",desc:"Black Friday Cyber Monday webcast",file:"-vrigt",course:"Allmän",url:"https://www.kwtrain.com/webcast-thank-you"}
  ],
  github: [
    {name:"Claude Code Best Practice",desc:"Bästa praxis för Claude Code AI-assisterad utveckling",file:"GithubRepoHelp/claude-code-best-practice-main/",course:"Allmän"},
    {name:"Get Shit Done",desc:"Produktivitetsverktyg och task management",file:"GithubRepoHelp/get-shit-done-main/",course:"Allmän"},
    {name:"GStack",desc:"Full-stack utvecklingsstack med modern arkitektur",file:"GithubRepoHelp/gstack-main/",course:"Allmän"},
    {name:"Port Scanner",desc:"Python-baserad nätverksskanner",file:"GithubRepoHelp/port-scanner-main/",course:"Allmän"},
    {name:"Superpowers",desc:"AI-verktyg och agent-konfigurationer",file:"GithubRepoHelp/superpowers-main/",course:"Allmän"}
  ],
  guide: [
    {name:"Studieguide inför tentamen",desc:"Sammanfattande studieguide för hela kursen",file:"StudieGuide/STUDIEGUIDE INFÖR TENTAMEN - NÄTVERKSTEKNIK.pdf",course:"Kurs 1"},
    {name:"Utförlig studieguide",desc:"Detaljerad genomgång av alla ämnen",file:"StudieGuide/studieguide_uttommande.pdf",course:"Allmän"},
    {name:"Studieguide Dag 1 Teknisk Kommunikation",desc:"Guide för teknisk kommunikation",file:"StudieGuide/Studieguide_Dag1_Teknisk_Kommunikation.pdf",course:"Kurs 5"},
    {name:"Studieguide Rapportskrivning",desc:"Guide för rapportskrivning",file:"StudieGuide/Studieguide_Rapportskrivning.docx",course:"Kurs 5"},
    {name:"Studieguide Routing & Switching",desc:"Guide för routing och switching",file:"StudieGuide/Studieguide_Routing_Switching.pdf",course:"Kurs 2"},
    {name:"Studieguide SASE",desc:"Guide för SASE (Secure Access Service Edge)",file:"StudieGuide/studieguide_sase.pdf",course:"Kurs 4"},
    {name:"Studieguide SIEM",desc:"Guide för SIEM (Security Information & Event Management)",file:"StudieGuide/Studieguide_SIEM.docx",course:"Kurs 4"},
    {name:"Studiehandledning",desc:"Allmän studiehandledning",file:"StudieGuide/studiehandledning.pdf",course:"Allmän"},
    {name:"The Way of the Cloud",desc:"Guide till molnteknik",file:"StudieGuide/the-way-of-the-cloud.pdf",course:"Kurs 3"},
    {name:"The Way of the Virtual Machine",desc:"Guide till virtuella maskiner",file:"StudieGuide/the_way_of_the_virtual_machine.pdf",course:"Kurs 3"},
    {name:"Virtual Enlightenment",desc:"Fördjupning inom virtualisering",file:"StudieGuide/virtual_enlightenment.pdf",course:"Kurs 3"},
    {name:"Zen Studiehandledning",desc:"Kompletterande studiehandledning",file:"StudieGuide/zen_studiehandledning_änna.pdf",course:"Allmän"}
  ]
};
let currentCourse = -1;
let fullOrder = [];
let flashOrder = [];
let flashIdx = 0;
let quizOrder = []; let quizData = []; let quizIdx = 0; let quizScore = 0; let quizAnswered = false;
let quizMistakes = [];
let showQuizTrans = false;
let quizTypeMode = false; let quizReverse = false;
let flashTrans = false;
let flashCategory = 'all';
let matchLeft = []; let matchRight = []; let matchSelected = null; let matchTrans = false;

function getActiveData() { return currentCourse===-1 ? courses.flatMap(c=>c.entries) : courses[currentCourse].entries; }
function getActiveCats() { return currentCourse===-1 ? [...new Map(courses.flatMap(c=>c.categories).map(c=>[c.id,c])).values()] : courses[currentCourse].categories; }
function getCatName(catId) { const c = getActiveCats().find(c=>c.id===catId); return c ? c.name : catId; }
function getCatColor(catId) { const c = getActiveCats().find(c=>c.id===catId); return c ? c.color : '#888'; }
function updateFullOrder() { fullOrder = getActiveData().map((_,i)=>i); }
function shuffleArray(a) { for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function isPlayableEntry(e){
  if(!e) return false;
  if(!e.meaning || !String(e.meaning).trim()) return false;
  if(/^#/.test(String(e.phrase||'').trim())) return false;
  return true;
}

function loadStats(courseId){
  try{return JSON.parse(localStorage.getItem('app_stats_'+courseId))||{quiz:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0},match:{rounds:0},exam:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0}};}
  catch(e){return{quiz:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0},match:{rounds:0},exam:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0}};}
}
function saveStats(courseId,s){localStorage.setItem('app_stats_'+courseId,JSON.stringify(s));}

function loadAllStats(){
  const result = {};
  courses.forEach(c => { result[c.id] = loadStats(c.id); });
  return result;
}

// Course selector
function initCourseSelector(){
  const sel = document.getElementById('courseSelect');
  sel.innerHTML = '<option value="-1">All Courses</option>'+courses.map((c,i) => '<option value="'+i+'">'+c.name+'</option>').join('');
  sel.value = currentCourse;
  sel.addEventListener('change', function(){
    currentCourse = parseInt(this.value);
    switchCourse();
  });
}

function switchCourse(){
  updateFullOrder();
  flashOrder = [...fullOrder];
  flashIdx = 0;
  updateFlashCategorySel();
  updateQuizCategorySel();
  const active = document.querySelector('.tab.active');
  if(active) {
    const tabId = active.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('tab-'+tabId).classList.add('active');
    if(tabId==='browse'){initFilterRow();renderBrowse();}
    if(tabId==='flash') renderFlash();
    if(tabId==='quiz') initQuiz();
    if(tabId==='match') initMatch();
    if(tabId==='concepts') renderCourseContent();
    if(tabId==='resources') renderResources();
    if(tabId==='dashboard') renderDashboard();
    if(tabId==='exam') updateExamCategorySel();

  }
}

// Confetti
function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function burstConfetti(x,y){  const colors = ['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#ff8a5c','#ff6eb4','#a66cff','#00d2d3','#ff4757','#2ed573','#eccc68','#5352ed'];
  for(let i=0;i<60;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = (x + (Math.random()-0.5)*320)+'px';
    el.style.top = (y + (Math.random()-0.5)*160)+'px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.animationDuration = (1.5 + Math.random()*2.5)+'s';
    el.style.animationDelay = (Math.random()*0.6)+'s';
    const shape = Math.random();
    if(shape<0.3){el.style.borderRadius='50%';el.style.width=el.style.height=(8+Math.random()*10)+'px';}
    else if(shape<0.6){el.style.borderRadius='2px';el.style.width=(6+Math.random()*14)+'px';el.style.height=(6+Math.random()*14)+'px';}
    else if(shape<0.8){el.style.borderRadius='0';el.style.clipPath='polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';el.style.width=el.style.height=(12+Math.random()*10)+'px';}
    else{el.style.borderRadius='0';el.style.width=(16+Math.random()*20)+'px';el.style.height='6px';el.style.borderRadius='2px';}
    el.style.transform = 'rotate('+(Math.random()*720)+'deg)';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),4500);
  }
  for(let i=0;i<30;i++){
    const s = document.createElement('div');
    s.className = 'confetti-piece';
    s.style.left = (x + (Math.random()-0.5)*280)+'px';
    s.style.top = (y + (Math.random()-0.5)*140)+'px';
    s.style.background = Math.random()>0.5 ? '#fff' : '#ffd700';
    s.style.width = s.style.height = (2+Math.random()*3)+'px';
    s.style.borderRadius = '50%';
    s.style.boxShadow = '0 0 4px rgba(255,215,0,0.8),0 0 8px rgba(255,215,0,0.4)';
    s.style.animationDuration = (1+Math.random()*1.5)+'s';
    s.style.animationDelay = (Math.random()*0.3)+'s';
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),3500);
  }
}

// Score messages
const scoreMessages = {
  perfect:['Flawless victory! You absolutely crushed it.','100%! Okay, color me impressed. You are officially a genius.','Perfection! Drop the mic, because you just nailed every single one.','A perfect score! Pop the champagne, you literally couldn\'t do any better.'],
  high:['So close it hurts! You\'re practically an expert.','Almost perfect! Just a tiny slip-up or two, but I am incredibly proud of you.','Wow, look at you go! Next time, we are getting that flawless score.','Oof, brilliant work! You are basically a genius. Let\'s get 100% next round!'],
  medium:['Ooh, getting hot! You\'re so close to the top.','Okay, brainiac in training! You\'re doing amazing, but let\'s push for those 80s.','Seventy-plus! I see you working hard. Just a little more practice and you\'ll dominate this.','Looking good! You\'ve definitely got the hang of it, just a few details to iron out.'],
  low:['Not bad! You\'re building a solid foundation, keep at it.','Getting there! Every round makes you stronger.','Solid effort! A few more rounds and you\'ll see big improvements.'],
  fail:['Oof, rough round! Dust yourself off and let\'s try that again.','Not your best work, but that\'s what practice is for! I believe in you.','Hey, we all start somewhere! Let\'s review and crush it on the next try.']
};
function getScoreMessage(pct){
  let tier;
  if(pct===100) tier='perfect';
  else if(pct>=80) tier='high';
  else if(pct>=70) tier='medium';
  else if(pct>=50) tier='low';
  else tier='fail';
  const msgs = scoreMessages[tier];
  return msgs[Math.floor(Math.random()*msgs.length)];
}

// Tab switching
function announce(msg){
  const live = document.getElementById('appLive');
  if(live) live.textContent = msg;
}
document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    document.querySelectorAll('.tab').forEach(t=>{
      if(t!==tab) t.setAttribute('aria-selected','false');
    });
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
    announce('Opened '+tab.textContent.trim()+' tab');
    if(tab.dataset.tab==='browse') renderBrowse();
    if(tab.dataset.tab==='flash') renderFlash();
    if(tab.dataset.tab==='quiz') initQuiz();
    if(tab.dataset.tab==='match') initMatch();
    if(tab.dataset.tab==='concepts') renderCourseContent();
    if(tab.dataset.tab==='resources') renderResources();
    if(tab.dataset.tab==='compare') renderCompare();
    if(tab.dataset.tab==='dashboard') renderDashboard();
    if(window.studyApp) window.studyApp.onTab(tab.dataset.tab);

  });
});

document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.altKey||e.metaKey) return;
  const tag = (e.target.tagName||'').toLowerCase();
  const typing = tag==='input'||tag==='textarea'||tag==='select'||e.target.isContentEditable;
  if(e.key==='/'&&!typing){
    e.preventDefault();
    const sb = document.getElementById('searchBox');
    if(sb){ sb.focus(); sb.select(); }
    return;
  }
  if(!typing && e.key>='1' && e.key<='4'){
    const tabs = document.querySelectorAll('.tab');
    const idx = parseInt(e.key,10)-1;
    if(tabs[idx]) tabs[idx].click();
  }
  if(!typing && (e.key==='ArrowLeft'||e.key==='ArrowRight')){
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const cur = tabs.findIndex(t=>t.classList.contains('active'));
    if(cur<0) return;
    const next = e.key==='ArrowLeft' ? (cur-1+tabs.length)%tabs.length : (cur+1)%tabs.length;
    tabs[next].click();
    tabs[next].focus();
  }
});

// Browse
function renderBrowse(){
  const data = getActiveData().filter(isPlayableEntry);
  const q = document.getElementById('searchBox').value.toLowerCase();
  const activeFilter = document.querySelector('.filter-btn.active');
  const cat = activeFilter ? activeFilter.dataset.filter : 'all';
  let items = data;
  if(cat!=='all') items = items.filter(i=>i.category===cat);
  if(q) items = items.filter(i=>i.phrase.toLowerCase().includes(q)||i.meaning.toLowerCase().includes(q)||i.translation.toLowerCase().includes(q));
  document.getElementById('countLabel').textContent = 'Showing '+items.length+' items';
  if(!items.length){
    document.getElementById('cardGrid').innerHTML = '<div class="empty-state"><div class="empty-icon">📭</div><div class="empty-text">No items found</div><div class="empty-sub">Add some data to get started</div></div>';
    return;
  }
  document.getElementById('cardGrid').innerHTML = items.map(i=>{
    const color = getCatColor(i.category);
    const showInit = 'style="display:none"';
    const svDef = i.translationSv || i.translation;
    return '<div class="vocab-card">'+
      '<div class="phrase">'+i.phrase+'<button class="speak-btn card-speak" data-text="'+i.phrase.replace(/"/g,'&quot;')+'" type="button" title="Pronounce phrase" aria-label="Pronounce phrase">🔊</button></div>'+
      '<span class="cat-tag" style="background:'+color+'22;color:'+color+'">'+getCatName(i.category)+'</span>'+
      '<div class="meaning">'+i.meaning+'<button class="speak-btn card-speak" data-text="'+i.meaning.replace(/"/g,'&quot;')+'" type="button" title="Pronounce meaning" aria-label="Pronounce meaning">🔊</button></div>'+
      '<div class="translation" style="display:none"><strong>'+i.translation+'</strong> &mdash; '+svDef+'</div>'+
      '<button class="card-trans-btn" onclick="var d=this.previousElementSibling;d.style.display=d.style.display===\'none\'?\'block\':\'none\';this.textContent=d.style.display===\'block\'?\'Hide Translation\':\'Translate\'">Translate</button>'+
    '</div>';
  }).join('');
  document.querySelectorAll('.card-speak').forEach(btn=>{
    btn.addEventListener('click',()=>playAudio(btn.dataset.text));
  });
}

function stripHtml(s){
  return String(s).replace(/<br\s*\/?>/gi,'\n').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').trim();
}

function initFilterRow(){
  const row = document.getElementById('filterRow');
  const cats = getActiveCats();
  row.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>'+
    cats.map(c=>'<button class="filter-btn" data-filter="'+c.id+'">'+c.name+'</button>').join('');
  row.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      row.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderBrowse();
    });
  });
}

document.getElementById('searchBox').addEventListener('input',renderBrowse);

// Flashcards
function updateFlashCategorySel(){
  const cats = getActiveCats();
  const sel = document.getElementById('flashCategory');
  sel.innerHTML = '<option value="all">All Categories</option>'+cats.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join('');
  if(flashCategory!=='all' && !cats.some(c=>c.id===flashCategory)) flashCategory = 'all';
  sel.value = flashCategory;
}
function rebuildFlashOrder(){
  const data = getActiveData();
  let pool = data.map((_,i)=>i).filter(i=>isPlayableEntry(data[i]));
  if(flashCategory!=='all') pool = pool.filter(i=>data[i].category===flashCategory);
  shuffleArray(pool);
  const count = parseInt(document.getElementById('flashCount').value) || pool.length;
  flashOrder = pool.slice(0,Math.min(count,pool.length));
  flashIdx=0;
}
function renderFlash(){
  const data = getActiveData();
  if(!data.length){
    document.getElementById('flashWrapper').innerHTML = '<div class="empty-state"><div class="empty-icon">🃏</div><div class="empty-text">No flashcards available</div><div class="empty-sub">Add some data to start studying</div></div>';
    return;
  }
  if(!flashOrder.length) rebuildFlashOrder();
  if(flashIdx >= flashOrder.length) flashIdx = 0;
  if(!flashOrder.length){ document.getElementById('flashWrapper').innerHTML = '<div class="empty-state"><div class="empty-icon">🃏</div><div class="empty-text">No cards match the selected category</div></div>'; return; }
  const item = data[flashOrder[flashIdx]];
  document.getElementById('fPhrase').textContent = item.phrase;
  document.getElementById('fCategory').textContent = getCatName(item.category);
  document.getElementById('fMeaning').textContent = item.meaning;
  document.getElementById('fTranslation').textContent = item.translationSv || item.translation;
  document.getElementById('fTranslation').style.display = flashTrans ? 'block' : 'none';
  loadAudioIndex().then(idx=>{
    const fs = document.getElementById('fSpeak');
    const fb = document.getElementById('fSpeakBack');
    if(fs) fs.style.display = idx[item.phrase] ? '' : 'none';
    if(fb) fb.style.display = idx[item.meaning] ? '' : 'none';
  });
  document.getElementById('flashIdx').textContent = flashIdx+1;
  document.getElementById('flashTotal').textContent = flashOrder.length;
  document.getElementById('flashBar').style.width = ((flashIdx+1)/flashOrder.length*100)+'%';
  document.getElementById('flashCard').classList.remove('flipped');
  document.getElementById('prevBtn').disabled = flashIdx===0;
  document.getElementById('nextBtn').disabled = flashIdx===flashOrder.length-1;
}
document.getElementById('flashCard').addEventListener('click',()=>{
  document.getElementById('flashCard').classList.toggle('flipped');
});

// Pronunciation audio (Piper pre-generated into data/audio/)
let audioIndex = null;
async function loadAudioIndex(){
  if(audioIndex!==null) return audioIndex;
  try{
    const r = await fetch('data/audio/index.json');
    audioIndex = await r.json();
  }catch(e){ audioIndex = {}; }
  return audioIndex;
}
let audioEl = null;
let speakingText = null;
function stopAudio(){
  if(audioEl && !audioEl.paused){ audioEl.pause(); audioEl.currentTime = 0; }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  speakingText = null;
}
function playAudio(text){
  if(!text) return;
  if(speakingText === text){
    if(audioEl && !audioEl.paused){ stopAudio(); return; }
    if('speechSynthesis' in window && window.speechSynthesis.speaking){ stopAudio(); return; }
  }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  const f = audioIndex && audioIndex[text];
  if(f){
    try{
      if(!audioEl) audioEl = new Audio();
      audioEl.src = 'data/audio/' + f;
      speakingText = text;
      audioEl.onended = ()=>{ speakingText = null; };
      audioEl.play().catch(()=>{});
    }catch(e){}
    return;
  }
  if('speechSynthesis' in window){
    speakingText = text;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.onend = ()=>{ speakingText = null; };
    window.speechSynthesis.speak(u);
  }
}
const fSpeakBtn = document.getElementById('fSpeak');
const fSpeakBackBtn = document.getElementById('fSpeakBack');
if(fSpeakBtn) fSpeakBtn.addEventListener('click',e=>{
  e.stopPropagation();
  const d = getActiveData();
  const item = d[flashOrder[flashIdx]];
  if(item) playAudio(item.phrase);
});
if(fSpeakBackBtn) fSpeakBackBtn.addEventListener('click',e=>{
  e.stopPropagation();
  const d = getActiveData();
  const item = d[flashOrder[flashIdx]];
  if(item) playAudio(item.meaning);
});
const qSpeakBtn = document.getElementById('qSpeakBtn');
if(qSpeakBtn) qSpeakBtn.addEventListener('click',()=>{
  const d = quizData.length ? quizData : getActiveData().filter(isPlayableEntry);
  const item = d[quizOrder[quizIdx]];
  if(item) playAudio(quizReverse ? item.meaning : item.phrase);
});
document.getElementById('prevBtn').addEventListener('click',()=>{if(flashIdx>0){flashIdx--;renderFlash();}});
document.getElementById('nextBtn').addEventListener('click',()=>{if(flashIdx<flashOrder.length-1){flashIdx++;renderFlash();}});
document.getElementById('shuffleBtn').addEventListener('click',()=>{
  rebuildFlashOrder();renderFlash();
});
document.getElementById('flashCount').addEventListener('change',()=>{
  rebuildFlashOrder();renderFlash();
});
document.getElementById('flashCategory').addEventListener('change',function(){
  flashCategory = this.value;
  rebuildFlashOrder();renderFlash();
});
document.getElementById('flashTransBtn').addEventListener('click',function(){
  flashTrans = !flashTrans;
  this.classList.toggle('active');
  this.textContent = flashTrans ? 'Hide Translation' : 'Show Translation';
  const el = document.getElementById('fTranslation');
  if(el) el.style.display = flashTrans ? 'block' : 'none';
});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('tab-flash').classList.contains('active')) return;
  if(e.key==='ArrowLeft'&&flashIdx>0){flashIdx--;renderFlash();}
  if(e.key==='ArrowRight'&&flashIdx<flashOrder.length-1){flashIdx++;renderFlash();}
  if(e.key===' '){e.preventDefault();document.getElementById('flashCard').classList.toggle('flipped');}
});

// Quiz
function catHasPlayable(catId){
  const data = currentCourse===-1 ? courses.flatMap(c=>c.entries) : courses[currentCourse].entries;
  return data.some(e=>e.category===catId && isPlayableEntry(e));
}
function updateQuizCategorySel(){
  const cats = getActiveCats().filter(c=>catHasPlayable(c.id));
  const sel = document.getElementById('quizCategory');
  const cur = sel.value;
  sel.innerHTML = '<option value="all">All Categories</option>'+cats.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join('');
  if(cur!=='all' && !cats.some(c=>c.id===cur)) sel.value = 'all';
}
document.getElementById('quizCount').addEventListener('change',initQuiz);
document.getElementById('quizCategory').addEventListener('change',initQuiz);
document.getElementById('quizTransBtn').addEventListener('click',()=>{
  showQuizTrans = !showQuizTrans;
  document.getElementById('quizTransBtn').classList.toggle('active');
  document.getElementById('quizTransBtn').textContent = showQuizTrans ? 'Hide Translation' : 'Show Translation';
  document.querySelectorAll('#quizOptions .sub').forEach(el=>el.classList.toggle('show',showQuizTrans));
});
document.getElementById('quizRevBtn').addEventListener('click',()=>{
  quizReverse = !quizReverse;
  document.getElementById('quizRevBtn').classList.toggle('active');
  initQuiz();
});
document.getElementById('quizTypeBtn').addEventListener('click',()=>{
  quizTypeMode = !quizTypeMode;
  document.getElementById('quizTypeBtn').classList.toggle('active');
  initQuiz();
});

function quizLabel(){
  if(quizTypeMode && quizReverse) return 'Type the phrase:';
  if(quizReverse) return 'Choose the correct phrase:';
  if(quizTypeMode) return 'Type the meaning:';
  return 'Choose the correct meaning:';
}

function initQuiz(){
  const rawData = getActiveData().filter(isPlayableEntry);
  if(!rawData.length){
    document.getElementById('quizArea').innerHTML = '<div class="empty-state"><div class="empty-icon">❓</div><div class="empty-text">No quiz data available</div><div class="empty-sub">Add some data to start quizzing</div></div>';
    document.getElementById('quizResult').style.display='none';
    return;
  }
  const quizCat = document.getElementById('quizCategory').value;
  const data = quizCat==='all' ? rawData : rawData.filter(e=>e.category===quizCat);
  if(!data.length){
    document.getElementById('quizArea').innerHTML = '<div class="empty-state"><div class="empty-icon">❓</div><div class="empty-text">No quiz data available for this category</div><div class="empty-sub">Choose a different category</div></div>';
    document.getElementById('quizResult').style.display='none';
    return;
  }
  quizData = data;
  document.getElementById('qLabel').textContent = quizLabel();
  const count = parseInt(document.getElementById('quizCount').value) || data.length;
  let pool = data.map((_,i)=>i);
  shuffleArray(pool);
  quizOrder = pool.slice(0,Math.min(count,pool.length));
  quizIdx=0;quizScore=0;quizAnswered=false;quizMistakes=[];
  document.getElementById('quizArea').style.display='block';
  document.getElementById('quizResult').style.display='none';
  document.getElementById('quizTotal').textContent = quizOrder.length;
  renderQuiz();
}

function normalizeAnswer(s){
  return String(s).trim().toLowerCase().replace(/\s+/g,' ');
}

function renderQuiz(){
  const data = quizData.length ? quizData : getActiveData().filter(isPlayableEntry);
  if(quizIdx>=quizOrder.length){showQuizResult();return;}
  const item = data[quizOrder[quizIdx]];
  document.getElementById('qPhrase').textContent = quizReverse ? item.meaning : item.phrase;
  document.getElementById('qCategory').textContent = getCatName(item.category);
  document.getElementById('quizIdx').textContent = quizIdx+1;
  document.getElementById('quizBar').style.width = (quizIdx/quizOrder.length*100)+'%';
  document.getElementById('quizNext').disabled = true;
  const container = document.getElementById('quizOptions');
  const letters = ['A','B','C','D'];

  if(quizTypeMode){
    container.innerHTML = '<div class="quiz-type-wrap"><input id="quizTypeInput" type="text" placeholder="'+escapeHtml(quizReverse?'Type the phrase…':'Type the meaning…')+'" autocomplete="off" autocapitalize="off" spellcheck="false"><button id="quizTypeSubmit" class="action-btn" type="button">Submit</button></div><div class="quiz-type-result" id="quizTypeResult"></div>';
    const input = document.getElementById('quizTypeInput');
    const submit = document.getElementById('quizTypeSubmit');
    const checkType = ()=>{
      if(quizAnswered) return;
      quizAnswered = true;
      const correct = quizReverse ? item.phrase : item.meaning;
      const resultEl = document.getElementById('quizTypeResult');
      document.querySelectorAll('#quizTypeInput').forEach(b=>b.disabled=true);
      submit.disabled = true;
      if(normalizeAnswer(input.value)===normalizeAnswer(correct)){
        quizScore++;
        resultEl.className = 'quiz-type-result correct';
        resultEl.textContent = '✓ Correct!';
        const r = submit.getBoundingClientRect(); burstConfetti(r.left+r.width/2,r.top+r.height/2);
      }else{
        quizMistakes.push({phrase:item.phrase,meaning:item.meaning,translation:item.translation,translationSv:item.translationSv});
        resultEl.className = 'quiz-type-result wrong';
        resultEl.innerHTML = '✗ Correct answer: <strong>'+escapeHtml(correct)+'</strong>';
      }
      document.getElementById('quizNext').disabled = false;
    };
    input.addEventListener('keydown',e=>{ if(e.key==='Enter') checkType(); });
    submit.addEventListener('click',checkType);
    input.focus();
    return;
  }

  let opts = [{text:quizReverse?item.phrase:item.meaning, translation:item.translationSv || item.translation}];
  const others = quizReverse ? data.filter(i=>i.phrase!==item.phrase) : data.filter(i=>i.meaning!==item.meaning);
  shuffleArray(others);
  const seen = {}; seen[opts[0].text] = 1;
  for(let i=0;i<others.length && opts.length<4;i++){
    const txt = quizReverse?others[i].phrase:others[i].meaning;
    if(!txt || seen[txt]) continue;
    seen[txt] = 1;
    opts.push({text:txt, translation:others[i].translationSv || others[i].translation});
  }
  shuffleArray(opts);

  const correctVal = quizReverse ? item.phrase : item.meaning;
  container.innerHTML = opts.map((o,i)=>'<button class="quiz-opt" data-val="'+escapeHtml(o.text)+'"><span class="opt-letter">'+letters[i]+'</span>'+escapeHtml(o.text)+'<div class="sub'+(showQuizTrans?' show':'')+'">'+escapeHtml(o.translation||'')+'</div></button>').join('');
  quizAnswered = false;
  document.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(quizAnswered) return;
      quizAnswered = true;
      document.querySelectorAll('.quiz-opt').forEach(b=>b.disabled=true);
      if(btn.dataset.val===correctVal){btn.classList.add('correct');quizScore++;const r=btn.getBoundingClientRect();burstConfetti(r.left+r.width/2,r.top+r.height/2);}
      else{btn.classList.add('wrong');quizMistakes.push({phrase:item.phrase,meaning:item.meaning,translation:item.translation,translationSv:item.translationSv});document.querySelectorAll('.quiz-opt').forEach(b=>{if(b.dataset.val===correctVal)b.classList.add('reveal');});}
      document.getElementById('quizNext').disabled = false;
    });
  });
}
document.getElementById('quizNext').addEventListener('click',()=>{quizIdx++;renderQuiz();});
document.getElementById('quizRestart').addEventListener('click',initQuiz);
function showQuizResult(){
  document.getElementById('quizArea').style.display='none';
  document.getElementById('quizResult').style.display='block';
  const pct = Math.round(quizScore/quizOrder.length*100);
  document.getElementById('finalScore').textContent = quizScore+'/'+quizOrder.length;
  document.getElementById('finalPct').textContent = pct+'%';
  document.getElementById('quizMsg').textContent = getScoreMessage(pct);
  const reviewEl = document.getElementById('quizReview');
  if(quizMistakes.length){
    reviewEl.innerHTML = '<div class="review-title">📝 Review Mistakes ('+quizMistakes.length+')</div>'+
      quizMistakes.map(m=>'<div class="review-card"><div class="r-phrase">'+m.phrase+'</div><div class="r-meaning">'+m.meaning+'</div><div class="r-translation">'+m.translation+'</div></div>').join('');
  } else {
    reviewEl.innerHTML = '';
  }
  if(currentCourse>=0){
    const courseId = courses[currentCourse].id;
    const s = loadStats(courseId);
    s.quiz.taken++;
    s.quiz.totalCorrect += quizScore;
    s.quiz.totalIncorrect += (quizOrder.length - quizScore);
    if(pct>s.quiz.best) s.quiz.best = pct;
    s.quiz.lastScore = pct;
    saveStats(courseId,s);
  }
}

// Match
document.getElementById('matchTransBtn').addEventListener('click',()=>{
  matchTrans = !matchTrans;
  document.getElementById('matchTransBtn').classList.toggle('active');
  document.getElementById('matchTransBtn').textContent = matchTrans ? 'Hide Translation' : 'Show Translation';
  renderMatch();
});
document.getElementById('matchSize').addEventListener('change',initMatch);
document.getElementById('matchNext').addEventListener('click',()=>{document.getElementById('matchResult').classList.remove('show');initMatch();});

function updateMatchCourseSel(){
  const sel = document.getElementById('matchCourse');
  sel.innerHTML = '<option value="all">All Courses</option>'+
    courses.map((c,i)=>'<option value="'+i+'">'+c.name+'</option>').join('');
}
function updateMatchCategorySel(){
  const courseVal = document.getElementById('matchCourse').value;
  const scope = courseVal==='all' ? courses.flatMap(c=>c.entries) : courses[parseInt(courseVal)].entries;
  const cats = (courseVal==='all' ? courses.flatMap(c=>c.categories) : courses[parseInt(courseVal)].categories).filter(c=>scope.some(e=>e.category===c.id && isPlayableEntry(e)));
  const sel = document.getElementById('matchCategory');
  const cur = sel.value;
  sel.innerHTML = '<option value="all">All Categories</option>'+
    cats.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join('');
  if(cur!=='all' && !cats.some(c=>c.id===cur)) sel.value = 'all';
}
document.getElementById('matchCourse').addEventListener('change',()=>{
  updateMatchCategorySel();
  initMatch();
});
document.getElementById('matchCategory').addEventListener('change',initMatch);

function getMatchData(){
  const courseVal = document.getElementById('matchCourse').value;
  const catVal = document.getElementById('matchCategory').value;
  let data = courseVal==='all' ? courses.flatMap(c=>c.entries).filter(isPlayableEntry) : courses[parseInt(courseVal)].entries.filter(isPlayableEntry);
  if(catVal!=='all') data = data.filter(e=>e.category===catVal);
  return data;
}

function initMatch(){
  const data = getMatchData();
  if(!data.length){
    document.getElementById('matchGrid').innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🎯</div><div class="empty-text">No match data available</div><div class="empty-sub">Add some data to play the matching game</div></div>';
    document.getElementById('matchStatus').textContent = '';
    document.getElementById('matchResult').classList.remove('show');
    return;
  }
  const size = Math.min(parseInt(document.getElementById('matchSize').value) || 3, data.length);
  let pool = data.map((_,i)=>i);
  shuffleArray(pool);
  const chosen = pool.slice(0,size);
  matchLeft = chosen.map(i=>({text:data[i].phrase,id:i,matched:false,item:data[i]}));
  matchRight = chosen.map(i=>({text:data[i].meaning,id:i,paired:false,item:data[i]}));
  shuffleArray(matchRight);
  matchSelected=null;
  document.getElementById('matchStatus').textContent = '0 / '+size+' matched';
  document.getElementById('matchResult').classList.remove('show');
  renderMatch();
}
function renderMatch(){
  const data = getActiveData();
  document.getElementById('matchLeft').innerHTML = '<h3>Phrases</h3>'+matchLeft.map((m,i)=>{
    let cls = m.matched?'match-item matched':'match-item';
    if(matchSelected&&matchSelected.side==='left'&&matchSelected.idx===i) cls+=' selected';
    const sub = m.item.translation;
    return '<div class="'+cls+'" data-side="left" data-idx="'+i+'" data-id="'+m.id+'">'+m.text+'<div class="sub'+(matchTrans?' show':'')+'">'+sub+'</div></div>';
  }).join('');
  document.getElementById('matchRight').innerHTML = '<h3>Meanings</h3>'+matchRight.map((m,i)=>{
    let cls = m.paired?'match-item matched':'match-item';
    if(matchSelected&&matchSelected.side==='right'&&matchSelected.idx===i) cls+=' selected';
    const sub = m.item.translationSv || m.item.translation;
    return '<div class="'+cls+'" data-side="right" data-idx="'+i+'" data-id="'+m.id+'">'+m.text+'<div class="sub'+(matchTrans?' show':'')+'">'+sub+'</div></div>';
  }).join('');

  const matched = matchLeft.filter(m=>m.matched).length;
  const total = matchLeft.length;
  document.getElementById('matchStatus').textContent = matched+' / '+total+' matched';

  if(matched===total){
    const pct = Math.round(matched/total*100);
    document.getElementById('matchScore').textContent = matched+' / '+total+' - '+pct+'%';
    document.getElementById('matchMsg').textContent = getScoreMessage(pct);
    document.getElementById('matchResult').classList.add('show');
    const gr = document.getElementById('matchGrid').getBoundingClientRect();
    burstConfetti(gr.left+gr.width/2,gr.top+gr.height/2);
    if(currentCourse>=0){
      const courseId = courses[currentCourse].id;
      const s = loadStats(courseId);
      s.match.rounds++;
      saveStats(courseId,s);
    }
    return;
  }

  document.querySelectorAll('#matchGrid .match-item:not(.matched)').forEach(el=>{
    el.addEventListener('click',()=>handleMatchClick(el.dataset.side,parseInt(el.dataset.idx),parseInt(el.dataset.id)));
  });
}
function handleMatchClick(side,idx,id){
  if(!matchSelected){
    if(side==='left'&&!matchLeft[idx].matched){matchSelected={side,idx,id};renderMatch();}
    else if(side==='right'&&!matchRight[idx].paired){matchSelected={side,idx,id};renderMatch();}
  } else {
    if(side===matchSelected.side){matchSelected={side,idx,id};renderMatch();return;}
    let li,ri;
    if(matchSelected.side==='left'){li=matchSelected.idx;ri=idx;}
    else{li=idx;ri=matchSelected.idx;}
    if(matchLeft[li].matched||matchRight[ri].paired){matchSelected=null;renderMatch();return;}
    if(matchLeft[li].id===matchRight[ri].id){
      matchLeft[li].matched=true;matchRight[ri].paired=true;
    } else {
      const el = document.querySelector('.match-item[data-side="right"][data-idx="'+ri+'"]');
      if(el){el.classList.add('wrong');setTimeout(()=>el.classList.remove('wrong'),400);}
      const el2 = document.querySelector('.match-item[data-side="left"][data-idx="'+li+'"]');
      if(el2){el2.classList.add('wrong');setTimeout(()=>el2.classList.remove('wrong'),400);}
    }
    matchSelected=null;
    renderMatch();
  }
}

// Exam (glossary-based)
let examQueue = []; let examIdx = 0; let examAnswers = []; let examTimer = null; let examTimeLeft = 0; let examActive = false;

function updateExamCourseSel(){
  const sel = document.getElementById('examCourse');
  if(!sel) return;
  sel.innerHTML = '<option value="-1">Mixed — All Courses</option>'+courses.map((c,i)=>'<option value="'+i+'">'+c.name+'</option>').join('');
  sel.addEventListener('change',updateExamCategorySel);
}
function updateExamCategorySel(){
  const sel = document.getElementById('examCategory');
  if(!sel) return;
  const exCourse = document.getElementById('examCourse').value;
  const scope = exCourse==='-1' ? courses.flatMap(c=>c.entries) : courses[parseInt(exCourse)].entries;
  const cats = (exCourse==='-1' ? courses.flatMap(c=>c.categories) : courses[parseInt(exCourse)].categories).filter(c=>scope.some(e=>e.category===c.id && isPlayableEntry(e)));
  const cur = sel.value;
  sel.innerHTML = '<option value="all">All Categories</option>'+cats.map(c=>'<option value="'+c.id+'">'+c.name+'</option>').join('');
  if(cur && cur!=='all' && !cats.some(c=>c.id===cur)) sel.value = 'all';
}
function buildExamQuestion(entry, pool, reverse){
  const opts = [{text:reverse?entry.phrase:entry.meaning, translation:entry.translationSv||entry.translation, correct:true}];
  const others = pool.filter(e=>e.phrase!==entry.phrase);
  shuffleArray(others);
  const seen = {}; seen[opts[0].text] = 1;
  for(let i=0;i<others.length && opts.length<4;i++){
    const txt = reverse ? others[i].phrase : others[i].meaning;
    if(!txt || seen[txt]) continue;
    seen[txt] = 1;
    opts.push({text:txt, translation:others[i].translationSv||others[i].translation, correct:false});
  }
  shuffleArray(opts);
  return {question: reverse?entry.meaning:entry.phrase, category:entry.category, translation:entry.translationSv||entry.translation, options:opts};
}
function startGlossaryExam(){
  const timeLimit = parseInt(document.getElementById('examTime').value) || 30;
  const exCourse = document.getElementById('examCourse').value;
  const exCat = document.getElementById('examCategory').value;
  const exRev = document.getElementById('examReverse').classList.contains('active');
  let pool = exCourse==='-1' ? courses.flatMap(c=>c.entries) : courses[parseInt(exCourse)].entries;
  pool = pool.filter(isPlayableEntry);
  if(exCat!=='all') pool = pool.filter(e=>e.category===exCat);
  if(!pool.length){ alert('No entries match this selection.'); return; }
  let count = parseInt(document.getElementById('examCount').value, 10);
  if(isNaN(count) || count<=0) count = pool.length; // 'All'
  const picked = pool.map((_,i)=>i);
  shuffleArray(picked);
  const chosen = picked.slice(0, Math.min(count,pool.length)).map(i=>pool[i]);
  examQueue = chosen.map(e=>buildExamQuestion(e, pool, exRev));
  examIdx = 0; examAnswers = new Array(examQueue.length).fill(null);
  examTimeLeft = timeLimit*60; examActive = true;
  document.getElementById('examSetup').style.display = 'none';
  document.getElementById('examArea').style.display = 'block';
  document.getElementById('examResult').style.display = 'none';
  showExamQuestion();
  if(examTimer) clearInterval(examTimer);
  examTimer = setInterval(()=>{
    examTimeLeft--;
    const m = Math.floor(examTimeLeft/60), s = examTimeLeft%60;
    const el = document.getElementById('examTimer');
    el.textContent = '⏱ '+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    el.className = 'exam-timer';
    if(examTimeLeft<=60) el.classList.add('critical');
    else if(examTimeLeft<=300) el.classList.add('warning');
    if(examTimeLeft<=0){ clearInterval(examTimer); examTimer = null; submitGlossaryExam(); }
  },1000);
}
function showExamQuestion(){
  if(examIdx>=examQueue.length || !examActive){ submitGlossaryExam(); return; }
  const q = examQueue[examIdx];
  document.getElementById('examBar').style.width = (examIdx/examQueue.length*100)+'%';
  document.getElementById('examIdxLabel').textContent = (examIdx+1)+' / '+examQueue.length;
  document.getElementById('examQPhrase').textContent = q.question;
  document.getElementById('examQConcept').textContent = getCatName(q.category);
  document.getElementById('examPrev').disabled = examIdx===0;
  const letters = ['A','B','C','D'];
  document.getElementById('examOptions').innerHTML = q.options.map((o,i)=>{
    const checked = examAnswers[examIdx]===i ? ' checked' : '';
    return '<label class="quiz-opt" style="display:flex;align-items:center;gap:10px;cursor:pointer">'+
      '<input type="radio" name="examOpt" value="'+i+'"'+checked+' style="accent-color:#ffb300;width:18px;height:18px">'+
      '<span class="opt-letter">'+letters[i]+'</span><span class="opt-text">'+escapeHtml(o.text)+'</span></label>';
  }).join('');
  document.querySelectorAll('#examOptions input[name="examOpt"]').forEach(r=>{
    r.addEventListener('change',()=>{ examAnswers[examIdx] = parseInt(r.value,10); });
  });
  document.getElementById('examNext').textContent = examIdx===examQueue.length-1 ? 'Finish ▶' : 'Next ▶';
}
document.getElementById('examPrev').addEventListener('click',()=>{ if(examIdx>0){ examIdx--; showExamQuestion(); } });
document.getElementById('examNext').addEventListener('click',()=>{
  if(examIdx<examQueue.length-1){ examIdx++; showExamQuestion(); }
  else submitGlossaryExam();
});
document.getElementById('examStartBtn').addEventListener('click',startGlossaryExam);
document.getElementById('examReverse').addEventListener('click',function(){ this.classList.toggle('active'); });
document.getElementById('examRestart').addEventListener('click',()=>{
  if(examTimer){ clearInterval(examTimer); examTimer = null; }
  examActive = false;
  document.getElementById('examSetup').style.display = 'block';
  document.getElementById('examArea').style.display = 'none';
  document.getElementById('examResult').style.display = 'none';
});
function submitGlossaryExam(){
  if(!examActive) return;
  examActive = false;
  if(examTimer){ clearInterval(examTimer); examTimer = null; }
  document.getElementById('examArea').style.display = 'none';
  document.getElementById('examResult').style.display = 'block';
  let score = 0; const reviewItems = [];
  for(let i=0;i<examQueue.length;i++){
    const q = examQueue[i];
    const ans = examAnswers[i];
    const ok = ans!==null && q.options[ans] && q.options[ans].correct;
    if(ok) score++;
    reviewItems.push({q, ans, ok});
  }
  const total = examQueue.length;
  const pct = total ? Math.round(score/total*100) : 0;
  document.getElementById('examFinalScore').textContent = score+'/'+total;
  document.getElementById('examFinalPct').textContent = pct+'%';
  const pass = pct>=85;
  document.getElementById('examPassBadge').style.display = pass?'inline-block':'none';
  document.getElementById('examFailBadge').style.display = pass?'none':'inline-block';
  document.getElementById('examMsg').textContent = getScoreMessage(pct);
  document.getElementById('examReview').innerHTML = reviewItems.map((r,i)=>{
    const q = r.q;
    const correctText = q.options.find(o=>o.correct);
    return '<div class="review-card'+(r.ok?'':' review-wrong')+'">'+
      '<div class="r-phrase">'+(i+1)+'. '+escapeHtml(q.question)+'</div>'+
      '<div class="r-meaning">'+(r.ok?'✓ Your answer: ':'✗ Your answer: ')+(r.ans!==null?escapeHtml(q.options[r.ans].text):'<em>not answered</em>')+'</div>'+
      (r.ok?'':'<div class="r-translation">Correct: <strong>'+escapeHtml(correctText?correctText.text:'')+'</strong></div>')+
      '<div class="r-translation">'+escapeHtml(q.translation||'')+'</div>'+
    '</div>';
  }).join('');
  if(currentCourse>=0){
    const courseId = courses[currentCourse].id;
    const s = loadStats(courseId);
    s.exam = s.exam || {taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0};
    s.exam.taken++; s.exam.totalCorrect += score; s.exam.totalIncorrect += (total-score);
    if(pct>s.exam.best) s.exam.best = pct;
    s.exam.lastScore = pct;
    saveStats(courseId,s);
  }
}

// Dashboard
function renderDashboard(){
  const allStats = loadAllStats();
  let combinedQuiz = {taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0};
  let combinedMatch = {rounds:0};

  function statusBadge(avg,taken){
    if(taken===0) return '<span class="badge badge-none"></span>';
    if(avg>=80) return '<span class="badge badge-good">Good</span>';
    if(avg>=50) return '<span class="badge badge-fair">Fair</span>';
    return '<span class="badge badge-low">Low</span>';
  }

  courses.forEach(c => {
    const s = allStats[c.id]; const q = s.quiz;
    combinedQuiz.taken += q.taken;
    combinedQuiz.totalCorrect += q.totalCorrect;
    combinedQuiz.totalIncorrect += q.totalIncorrect;
    if(q.best>combinedQuiz.best) combinedQuiz.best = q.best;
    combinedMatch.rounds += s.match.rounds;
  });

  const combTotal = combinedQuiz.totalCorrect+combinedQuiz.totalIncorrect;
  const combAvg = combTotal>0 ? Math.round(combinedQuiz.totalCorrect/combTotal*100) : 0;

  let sm2 = {due:0,studied:0,streak:0,masteredPct:0,total:0};
  try{ if(window.studyApp && window.studyApp.getSm2Stats) sm2 = window.studyApp.getSm2Stats()||sm2; }catch(e){}

  let html = '<div class="dash-hero-card"><div class="dash-hero-grid">'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+sm2.due+'</span><span class="dash-hero-lbl">Due Today</span></div>'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+sm2.studied+'</span><span class="dash-hero-lbl">Studied Today</span></div>'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+sm2.streak+'</span><span class="dash-hero-lbl">Day Streak</span></div>'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+sm2.masteredPct+'%</span><span class="dash-hero-lbl">Mastered</span></div>'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+combinedQuiz.taken+'</span><span class="dash-hero-lbl">Quizzes</span></div>'+
    '<div class="dash-hero-stat"><span class="dash-hero-val">'+combAvg+'%</span><span class="dash-hero-lbl">Avg Score</span></div>'+
  '</div></div>';

  html += '<div class="dash-course-grid">';
  courses.forEach(c => {
    const s = allStats[c.id]; const q = s.quiz;
    const total = q.totalCorrect+q.totalIncorrect;
    const avg = total>0 ? Math.round(q.totalCorrect/total*100) : 0;
    const st = q.taken===0 ? 'Not Started' : (avg>=80 ? 'Mastered' : (avg>=50 ? 'In Progress' : 'Needs Review'));
    const sc = q.taken===0 ? '#666' : (avg>=80 ? '#2e7d32' : (avg>=50 ? '#f57f17' : '#c62828'));
    html += '<div class="dash-card" style="border-left-color:'+sc+'"><div class="dash-header"><h3>'+
      c.name.replace('Kurs ','K')+'</h3><span class="dash-course-status" style="background:'+sc+'">'+st+'</span></div>'+
      '<div class="dash-card-body">'+
      '<div class="dash-metric"><span class="dash-metric-lbl">Quizzes</span><span class="dash-metric-val">'+q.taken+'</span></div>'+
      '<div class="dash-metric"><span class="dash-metric-lbl">Best</span><span class="dash-metric-val">'+q.best+'%</span></div>'+
      '<div class="dash-metric"><span class="dash-metric-lbl">Average</span><span class="dash-metric-val">'+avg+'%</span></div>'+
      '<div class="dash-metric"><span class="dash-metric-lbl">Correct</span><span class="dash-metric-val">'+q.totalCorrect+'/'+total+'</span></div>'+
      '<div class="dash-metric"><span class="dash-metric-lbl">Match</span><span class="dash-metric-val">'+s.match.rounds+'</span></div>'+
      '<div class="dash-bar" style="margin-top:8px"><div style="width:'+avg+'%;background:'+sc+'"></div></div>'+
    '</div></div>';
  });
  html += '</div>';

  html += '<div style="text-align:center;margin-top:18px"><button class="dash-reset-btn" id="resetStatsBtn">Reset All Data</button></div>';

  document.getElementById('dashGrid').innerHTML = html;
  document.getElementById('resetStatsBtn').addEventListener('click',()=>{
    if(confirm('Reset all stats for all courses?')){
      courses.forEach(c => saveStats(c.id,{quiz:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0},match:{rounds:0},exam:{taken:0,best:0,totalCorrect:0,totalIncorrect:0,lastScore:0}}));
      renderDashboard();
    }
  });
}



// Course Content
function formatConceptText(text){
  if(!text) return '';
  let s = text.replace(/\\\n/g,'\n').replace(/\n/g,'\n');
  const lines = s.split('\n');
  let html = '', inList = false;
  for(let line of lines){
    const trimmed = line.trim();
    if(!trimmed){ if(inList){ html+='</div>'; inList=false; } continue; }
    const m = trimmed.match(/^\.(\d+)\.\s+(.*)$/);
    if(m){
      if(!inList){ html+='<div class="concept-num-list">'; inList=true; }
      html+='<div class="concept-num-item"><span class="concept-num-badge">'+m[1]+'</span><span>'+m[2]+'</span></div>';
    } else {
      if(inList){ html+='</div>'; inList=false; }
      html+='<p>'+trimmed+'</p>';
    }
  }
  if(inList) html+='</div>';
  return html;
}
function renderCourseContent(){
  const courseSel = document.getElementById('conceptCourse');
  const topicSel = document.getElementById('conceptTopic');
  const content = document.getElementById('conceptContent');
  if(!courseSel.options.length){
    courseSel.innerHTML = courses.map((c,i)=>'<option value="'+i+'">'+c.name+'</option>').join('');
    courseSel.onchange = () => { topicSel.innerHTML=''; renderCourseContent(); };
  }
  const idx = parseInt(courseSel.value);
  if(isNaN(idx)||idx<0||idx>=courses.length){
    content.innerHTML = '<div class="empty-state"><div class="empty-icon">\ud83d\udcda</div><div class="empty-text">Select a course to view concepts</div></div>';
    topicSel.innerHTML=''; return;
  }
  const courseId = courses[idx].id;
  const cc = window.ccnaConcepts || {};
  const conceptMap = { course1:'kurs1', course2:'kurs2', course3:'kurs4', course4:'kurs3', course5:'kurs5', course6:'kurs6', course7:'kurs7', course_linux:'allman-linux' };
  const courseTopics = (cc[courseId] || cc[conceptMap[courseId]] || []).filter(t=>t&&(t.title||t.titleSv)).map(t=>({
    title: t.title || t.titleSv || '',
    txt: t.txt || t.body || '',
    txtSv: t.txtSv || '',
    sections: t.sections || [],
    svg: t.svg || '',
    take: t.take || [],
    links: t.links || []
  }));
  if(!courseTopics.length){
    content.innerHTML = '<div class="empty-state"><div class="empty-icon">\ud83d\udcda</div><div class="empty-text">'+(courseId==='course_hardware'
      ? 'No concept pages for this course yet. Its 6 hardware terms are available in Browse, Quiz and Match.'
      : 'No concepts available for this course')+'</div></div>';
    topicSel.innerHTML = ''; return;
  }
  if(!topicSel.options.length||!topicSel.value){
    topicSel.innerHTML = courseTopics.map((t,i)=>'<option value="'+i+'">'+t.title+'</option>').join('');
  }
  function detectResourceType(path){
    if(path.includes('B\u00f6cker/')) return {icon:'\ud83d\udcda',label:'Book'};
    if(path.includes('StudieGuide/')) return {icon:'\ud83d\udcd6',label:'Study Guide'};
    if(path.match(/\.(m4a|mp3|wav)$/i)) return {icon:'\ud83c\udfa7',label:'Audio'};
    if(path.match(/\.(png|jpg|jpeg|gif|svg)$/i)) return {icon:'\ud83d\uddbc\ufe0f',label:'Diagram'};
    return {icon:'\ud83d\udcc4',label:'Material'};
  }
  function renderResourceCards(links){
    if(!links||!links.length) return '';
    return '<div class="concept-resources-section"><div class="concept-resources-title">\ud83d\udcda Study Materials</div><div class="study-card-grid">'+
      links.map((l,i)=>{
        const p=l.split('|');
        const rt = detectResourceType(p[0]);
        const isPdf = p[0].match(/\.pdf$/i);
        return '<div class="study-card" data-idx="'+i+'" data-path="'+p[0].replace(/"/g,'&quot;')+'" data-is-pdf="'+(isPdf?'1':'0')+'">'+
          '<div class="study-card-icon">'+rt.icon+'</div>'+
          '<div class="study-card-info">'+
            '<div class="study-card-title">'+p[1]+'</div>'+
            '<div class="study-card-badge">'+rt.label+'</div>'+
          '</div>'+
          '<span class="study-card-action">'+(isPdf?'\u25b6 Read':'Open \u2197')+'</span>'+
        '</div>';
      }).join('')+
      '</div></div>';
  }
  function renderRelatedVocab(courseId, limit){
    const course = courses.find(c=>c.id===courseId);
    if(!course||!course.entries||!course.entries.length) return '';
    const items = course.entries.slice(0,limit||12);
    return '<div class="related-vocab-section"><div class="related-vocab-title">\ud83d\udd0d Related Vocabulary</div><div class="related-vocab-grid">'+
      items.map(v=>'<span class="related-vocab-tag" data-phrase="'+v.phrase.replace(/"/g,'&quot;')+'">'+v.phrase+'<span class="cat-tag">'+v.category+'</span></span>').join('')+
    '</div></div>';
  }
  function renderDeepDive(sections){
    if(!sections||!sections.length) return '';
    const toc = sections.map((s,i)=>'<span class="deep-dive-toc-link" data-idx="'+i+'">'+(i+1)+'. '+s.heading+'</span>').join('');
    const blocks = sections.map((s,i)=>'<details class="deep-dive-block"><summary>'+(i+1)+'. '+s.heading+' <span class="deep-dive-source">\ud83d\udcda '+s.source+'</span></summary><div class="deep-dive-body">'+s.body+'</div></details>').join('');
    return '<div class="deep-dive-section"><div class="deep-dive-title">\ud83d\udcda From the Course Literature <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400">('+sections.length+' sections)</span></div>'+
      '<div class="deep-dive-toc">'+toc+'</div>'+
      blocks+
    '</div>';
  }
  const showTopic = (tidx) => {
    const t = courseTopics[tidx];
    if(!t){ content.innerHTML=''; return; }
    const renderTopic = () => {
    const txtHtml = formatConceptText(t.txt);
    const txtSvHtml = formatConceptText(t.txtSv);
    const html = '<div class="concept-card"><div class="concept-header"><h2>'+t.title+'</h2><button id="translateBtn" class="match-trans-btn">Show Translation</button><div class="topic-sub">Course Content</div></div>'+
      '<div class="concept-body-wrap"><div class="concept-body">'+txtHtml+
      (t.txt ? '<button class="speak-btn concept-speak" data-text="'+escapeHtml(stripHtml(t.txt))+'" type="button" title="Pronounce" aria-label="Pronounce">\ud83d\udd0a Read Aloud</button>' : '')+
      '<div class="concept-translation" style="display:none">'+txtSvHtml+
      (t.txtSv ? '<button class="speak-btn concept-speak" data-text="'+escapeHtml(stripHtml(t.txtSv))+'" type="button" title="Pronounce" aria-label="Pronounce">\ud83d\udd0a L\u00e4s h\u00f6gt</button>' : '')+
      '</div></div>'+
      renderDeepDive(t.sections)+
      (t.svg ? '<div class="concept-svg-wrap">'+t.svg+'</div>' : '')+
      '</div>'+
      '<div class="takeaway-section"><div class="takeaway-title">Key Takeaways</div><div class="takeaway-list">'+
        t.take.map((tt,i2)=>'<li><span style="font-weight:600;color:var(--tag-color);margin-right:6px">'+(i2+1)+'.</span> '+tt+'</li>').join('')+
      '</div></div>'+
      renderResourceCards(t.links)+
      renderRelatedVocab(courseId,12)+
    '</div>';
    content.innerHTML = html;
    const transBtn = content.querySelector('#translateBtn');
    if(transBtn){
      transBtn.addEventListener('click',()=>{
        const td = content.querySelector('.concept-translation');
        if(td){
          const h = td.style.display==='none';
          td.style.display = h ? 'block' : 'none';
          transBtn.textContent = h ? 'Hide Translation' : 'Show Translation';
          transBtn.classList.toggle('active',h);
        }
      });
    }
    rebuildListeners();
  };
  renderTopic();
  function rebuildListeners(){
    content.querySelectorAll('.concept-speak').forEach(btn=>{
      btn.addEventListener('click',()=>playAudio(btn.dataset.text));
    });
    content.querySelectorAll('.concept-svg-wrap svg').forEach(s=>{
      s.style.width='100%';s.style.maxWidth='100%';s.style.height='auto';s.style.display='block';
    });
    content.querySelectorAll('.deep-dive-block').forEach(block=>{
      block.addEventListener('toggle',()=>{
        if(block.open){
          content.querySelectorAll('.deep-dive-block[open]').forEach(b=>{if(b!==block)b.open=false;});
        }
      });
    });
    content.querySelectorAll('.deep-dive-toc-link').forEach(link=>{
      link.addEventListener('click',()=>{
        const idx = parseInt(link.dataset.idx);
        const blocks = content.querySelectorAll('.deep-dive-block');
        if(blocks[idx]){
          blocks[idx].open = !blocks[idx].open;
          blocks[idx].scrollIntoView({behavior:'smooth',block:'start'});
        }
      });
    });
    content.querySelectorAll('.study-card').forEach(card=>{
      card.addEventListener('click',()=>{
        const path = card.dataset.path;
        const isPdf = card.dataset.isPdf==='1';
        if(!isPdf){
          window.open(path,'_blank');
          return;
        }
        const wrap = card.nextElementSibling;
        if(wrap && wrap.classList.contains('pdf-viewer-wrap')){
          wrap.classList.toggle('open');
          card.classList.toggle('open');
          return;
        }
        content.querySelectorAll('.pdf-viewer-wrap.open').forEach(w=>{w.classList.remove('open');w.previousElementSibling&&w.previousElementSibling.classList.remove('open');});
        const div = document.createElement('div');
        div.className = 'pdf-viewer-wrap';
        div.innerHTML = '<embed src="'+path.replace(/"/g,'&quot;')+'" type="application/pdf">';
        card.parentNode.insertBefore(div,card.nextSibling);
        card.classList.add('open');
        requestAnimationFrame(()=>div.classList.add('open'));
      });
    });
    content.querySelectorAll('.related-vocab-tag').forEach(tag=>{
      tag.addEventListener('click',()=>{
        const phrase = tag.dataset.phrase;
        document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
        document.querySelector('[data-tab="browse"]').classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
        document.getElementById('tab-browse').classList.add('active');
        document.getElementById('searchBox').value = phrase;
        renderBrowse();
      });
    });
  };
  };
  topicSel.onchange = () => showTopic(parseInt(topicSel.value));
  if(courseTopics.length) showTopic(parseInt(topicSel.value)||0);
}

// Resources
function renderResources(){
  const activeFilter = document.querySelector('#resFilterRow .filter-btn.active');
  const type = activeFilter ? activeFilter.dataset.restype : 'all';
  const searchBox = document.getElementById('resSearchBox');
  const searchTerm = searchBox ? searchBox.value.toLowerCase().trim() : '';
  let items = [];
  if(type==='all'){
    Object.keys(resourcesData).forEach(k=>{resourcesData[k].forEach(r=>items.push({...r,type:k}));});
  } else {
    (resourcesData[type]||[]).forEach(r=>items.push({...r,type}));
  }
  if(searchTerm){
    items = items.filter(r => r.name.toLowerCase().includes(searchTerm) || r.desc.toLowerCase().includes(searchTerm));
  }
  const content = document.getElementById('resourcesContent');
  if(!items.length){
    content.innerHTML = '<div class="empty-state"><div class="empty-icon">\ud83d\udcc1</div><div class="empty-text">No resources found'+(searchTerm?' matching "'+searchTerm+'"':'')+'</div></div>';
    return;
  }
  const icons = {pdf:'\ud83d\udcc4',image:'\ud83d\uddbc\ufe0f',audio:'\ud83c\udfa7',doc:'\ud83d\udcc3',books:'\ud83d\udcda',websites:'\ud83c\udf10',github:'\ud83d\udcbb',guide:'\ud83d\udcd6'};
  const badgeColor = {pdf:'var(--error)',image:'var(--success)',audio:'var(--tag-color)',doc:'#60a5fa',books:'var(--primary)',websites:'#a78bfa',github:'#cbd5e1',guide:'#f59e0b'};
  content.innerHTML = '<div class="res-list">'+items.map(r=>{
    const badge = '<span class="res-badge" style="border-color:'+(badgeColor[r.type]||'var(--border)')+';color:'+(badgeColor[r.type]||'var(--text)')+'">'+(r.type||'').toUpperCase()+'</span>';
    if(r.type==='audio'){
      return '<div class="res-row audio-row"><span class="res-ico">'+(icons[r.type]||'\ud83c\udfa7')+'</span>'+
        '<div class="res-meta"><div class="res-name">'+r.name+'</div><div class="res-sub">'+r.desc+' \u00b7 '+r.course+'</div></div>'+
        badge+'<audio controls preload="none" class="res-audio" style="width:100%;max-width:240px;height:34px"><source src="'+r.file+'" type="audio/mpeg"></audio></div>';
    }
    if(r.type==='websites'){
      return '<div class="res-row"><span class="res-ico">'+(icons[r.type]||'\ud83c\udf10')+'</span>'+
        '<div class="res-meta"><div class="res-name">'+r.name+'</div><div class="res-sub">'+r.desc+' \u00b7 '+r.course+'</div></div>'+
        badge+'<a class="res-act" href="'+r.url+'" target="_blank" rel="noopener" role="button">Open \u2197</a></div>';
    }
    return '<div class="res-row"><span class="res-ico">'+(icons[r.type]||'\ud83d\udcc4')+'</span>'+
      '<div class="res-meta"><div class="res-name">'+r.name+'</div><div class="res-sub">'+r.desc+' \u00b7 '+r.course+'</div></div>'+
      badge+
      '<a class="res-act" href="'+r.file+'" target="_blank" rel="noopener">Open \u2197</a>'+
      '<a class="res-act" href="'+r.file+'" download>Download \u2b07</a></div>';
  }).join('')+'</div>';
}

// Filter resources
document.getElementById('resSearchBox').addEventListener('input',renderResources);
document.querySelectorAll('#resFilterRow .filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#resFilterRow .filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderResources();
  });
});

// Study planner
// Compare tab
function renderCompare() {
  var sel = document.getElementById('compareTopic');
  if (!sel) return;
  if (!comparisonData || comparisonData.length === 0) {
    document.getElementById('compareIntro').style.display = 'block';
    document.getElementById('compareTableWrap').style.display = 'none';
    return;
  }
  if (sel.options.length === 0) {
    var order = comparisonData.map(function(t,i){ return {i:i, s:(t.subject||'Other')}; });
    order.sort(function(a,b){ return a.s < b.s ? -1 : a.s > b.s ? 1 : 0; });
    var lastGroup = null;
    order.forEach(function(o) {
      var t = comparisonData[o.i];
      if (t.subject !== lastGroup) {
        var og = document.createElement('optgroup');
        og.label = t.subject || 'Other';
        sel.appendChild(og);
        lastGroup = t.subject;
      }
      var opt = document.createElement('option');
      opt.value = o.i;
      opt.textContent = t.name;
      var groups = sel.querySelectorAll('optgroup');
      (groups[groups.length-1] || sel).appendChild(opt);
    });
    sel.addEventListener('change', function() { renderCompare(); });
  }
  var idx = parseInt(sel.value);
  if (isNaN(idx)) {
    document.getElementById('compareIntro').style.display = 'block';
    document.getElementById('compareTableWrap').style.display = 'none';
    return;
  }
  var topic = comparisonData[idx];
  if (!topic) return;
  document.getElementById('compareIntro').style.display = 'none';
  document.getElementById('compareTableWrap').style.display = 'block';
  var thead = document.getElementById('compareHeader');
  var tbody = document.getElementById('compareBody');
  thead.innerHTML = '';
  tbody.innerHTML = '';
  var hdr = document.createElement('tr');
  var th0 = document.createElement('th');
  th0.textContent = 'Aspect';
  hdr.appendChild(th0);
  if (topic.column1) {
    var th1 = document.createElement('th');
    th1.textContent = topic.column1;
    hdr.appendChild(th1);
  }
  if (topic.column2) {
    var th2 = document.createElement('th');
    th2.textContent = topic.column2;
    hdr.appendChild(th2);
  }
  if (topic.column3) {
    var th3 = document.createElement('th');
    th3.textContent = topic.column3;
    hdr.appendChild(th3);
  }
  thead.appendChild(hdr);
  topic.rows.forEach(function(row) {
    var tr = document.createElement('tr');
    var td0 = document.createElement('td');
    td0.textContent = row.aspect;
    td0.className = 'compare-aspect';
    tr.appendChild(td0);
    if (row.c1 !== undefined) {
      var td1 = document.createElement('td');
      td1.textContent = row.c1;
      tr.appendChild(td1);
    }
    if (row.c2 !== undefined) {
      var td2 = document.createElement('td');
      td2.textContent = row.c2;
      tr.appendChild(td2);
    }
    if (row.c3 !== undefined) {
      var td3 = document.createElement('td');
      td3.textContent = row.c3;
      tr.appendChild(td3);
    }
    tbody.appendChild(tr);
  });
}

// Theme toggle
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved==='light') document.body.classList.add('light-mode');
  document.getElementById('themeToggle').innerHTML = saved==='light' ? '\u2600\uFE0F Light' : '\uD83C\uDF19 Dark';
})();
document.getElementById('themeToggle').addEventListener('click',function(){
  const isLight = document.body.classList.toggle('light-mode');
  this.innerHTML = isLight ? '\u2600\uFE0F Light' : '\uD83C\uDF19 Dark';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
// Init
initCourseSelector();
updateExamCourseSel();
updateExamCategorySel();
updateFullOrder();
flashOrder = [...fullOrder];
initFilterRow();
renderBrowse();
updateFlashCategorySel();
updateQuizCategorySel();
updateMatchCourseSel();
updateMatchCategorySel();
renderFlash();
renderDashboard();
// Pre-populate compare selector is handled inside renderCompare (grouped by subject)
if (document.getElementById('compareTopic')) {
  document.getElementById('compareTopic').addEventListener('change', function() { renderCompare(); });
}

// Export for statsbar.js
window.appStats = { resourcesData: resourcesData };
window.appAudio = { play: playAudio, stop: stopAudio };

})();

