const seminarieLista = [
    new Seminare("Kemi", "Efter avslutad kurs skall den studerande:<br/>• kunna tillämpa grundläggande teoretiska, laborativa och instrumentella färdigheter inom titreringsanalys och elektroanalytisk kemi<br/>•med hjälp av handledning kunna presentera, analysera och diskutera empiriska data i analytisk kemi i form av en laborationsrapport<br/>• kunna planera, implementera och utvärdera undervisningsmoment.<br/>• kunna jämföra olika modeller för bedömning av kunskap och förmågor<br/>• kunna organisera och strukturera innehållet för lärande i ett mångkulturellt sammanhang<br/>•kunna använda engelsk terminlogi inom analytisk kemi"),

    new Seminare("Tyska", "Efter avslutad kurs ska den studerande kunna:<br/>• utföra ett vetenskapligt arbete i form av en undersökning av en begränsad språkvetenskaplig eller litterär frågeställning.<br/>• visa språkvetenskaplig orientering och goda insikter i det tyska språkets grammatik, fonetik, lexikologi och variationsformer.<br/>• demonstrera grundläggande litteraturvetenskaplig orientering, vidgade kunskaper om de tyskspråkiga ländernas litteratur.<br/>• behärska tyska i tal och skrift med i huvudsak korrekt grammatik, gott ordförråd och med korrekt ljudbildning och intonation."),

    new Seminare("Engelska", "Kursen skall ge träning i att använda det engelska språket på ett korrekt sätt i professionella kontexter. Kursen skall också ge studenterna möjlighet att fördjupa och expandera sitt ordförråd, speciellt med de termer som de kan förväntas träffa på yrkeslivet. Efter avslutad kurs förväntas studenten att kunna:<br/>• Läsa, förstå och diskutera texter av skilda slag<br/>• Behärska ett fördjupat ord och frasförråd som riktar sig mot stadsplanering i olika former, t.ex transport, stadsarkitektur mm<br/>• Använda det engelska språket på ett lämpligt och situationsanpassat sätt i skrift och tal<br/>• Beskriva och jämföra statistik<br/>• Presentera information och idéer för en internationell publik<br/>• Delta i möten av professionellt slag<br/>• Formulera och argumentera för egna idéer och synpunkter<br/>• Skriva brev och rapporter<br/>• Sammanfatta en längre text<br/>• Identifiera och analysera sina egna språkliga styrkor och svagheter samt utveckla och applicera strategier för självförbättring."),

    new Seminare("Objektorienterad programmering", "Kursen syftar till att studenterna ska lära grundläggande programmering och objektorienterad programmeringsteknik. Efter avslutad kurs ska studenten kunna:<br/>• förklara begrepp inom imperativ och objektorienterad programmering<br/>• strukturera och skriva program på c:a 1000 rader kod i ett objektorienterat programspråk, t.ex. Java.<br/>• kunna sätta sig in i och använda standardbibliotek för det valda program-språket.<br/>• felsöka och dokumentera sitt program.")
];


$(document).ready(function () {
    $('body').bootstrapMaterialDesign();


    initialize();
    seminarieHover();
    seminarieClick();
});

function initialize() {
    //Prepare toast
    let toastOptions = new Object();
    toastOptions.delay = 3000;
    toastOptions.autohide = true;
    $('.toast').toast(toastOptions);

    //Insert fake data
    for (Sem of seminarieLista) {
        $("#seminarie-lista").append(seminarieHTML(Sem.name, Sem.description));
    }

    //Prepare spinner
    $(".spinner").hide();
}

function fakeApply(button) {
    let spinner = button.find(".spinner");
    button.prop('disabled', true);
    spinner.show();

    setTimeout(
        function () {
            spinner.hide();
            button.removeClass("btn-primary");
            button.addClass("btn-success");
            button.html("ANSÖKT!");
            $('.toast').toast('show');
        },
        3000);
}

function seminarieClick() {
    $(".seminarie").click(function () {
        let currentButton = $('.btn:hover');
        if (currentButton.length == 0) {
            $(this).find(".collapse").slideToggle("fast");

            let current_button = $(this).find(".expand-button");
            let current_button_text = current_button.html().trim();

            if (current_button_text == "expand_more") {
                current_button.html("expand_less");
            } else {
                current_button.html("expand_more");
            }
        } else {
            fakeApply(currentButton);
        }
    });
}

function seminarieHover() {
    $(".seminarie").hover(
        function () {
            $(this).addClass('shadow');
        },
        function () {
            $(this).removeClass('shadow');
        }
    );
}

function seminarieHTML(title, content) {
    return '<div class="row shadow-sm p-2 my-4 rounded seminarie"> <div class="col-10"> <div> <h5>' + title + '</h5> </div> </div> <div class="col-2"> <div class="float-right"> <span class="material-icons expand-button"> expand_more </span> </div> </div> <div class="collapse w-100 px-3"> <p>' + content + '</p> <div class="float-right"> <button type="button" class="btn btn-raised btn-primary"> <span class="spinner-border spinner-border-sm spinner" role="status" aria-hidden="true"></span> ANSÖK </button> </div> </div> </div>';
}

function Seminare(name, description) {
    this.name = name;
    this.description = description;
}
