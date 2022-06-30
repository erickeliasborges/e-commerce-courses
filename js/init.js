class contentCourseInfo {
  constructor(element, courseFeatures, courseDescription, whatLearn) {
    this.element = element;
    this.courseFeatures = courseFeatures;
    this.courseDescription = courseDescription;
    this.whatLearn = whatLearn;
  }
}

// Adiciona nos elementos com a propriedade [data-toggle="popover-mouseleave"] um popover contento a imagem, título e outras informações do curso
// Obrigatório ter os elementos abaixo dentro do elemento mencionado acima
// <!-- popover -->
// <div class="display-none" id="{id do elemento com a propriedade [data-toggle="popover-mouseleave"]}-courseFeatures">Todos os níveis</div>
// <div class="display-none" id="{id do elemento com a propriedade [data-toggle="popover-mouseleave"]}-courseDescription"> curso 1 </div>
// <div class="display-none" id="{id do elemento com a propriedade [data-toggle="popover-mouseleave"]}-whatLearn">
//   Criar projetos com bootstrap;
//   Bootstrap 5;
//   Todos os componentes de bootstrap
// </div> o ; serve para quebrar o texto em um novo check do bloco "O que aprenderá"
$(function () {
  $('[data-toggle="popover-mouseleave"]').popover({
    trigger: "manual",
    html: true,
    content: function () {
      insertHTMLContentCourseInfo(
        new contentCourseInfo(
          this,
          $(`#${this.id}-courseFeatures`)[0].textContent,
          $(`#${this.id}-courseDescription`)[0].textContent,
          $(`#${this.id}-whatLearn`)[0].textContent.split(";")));
      return $(`#${this.id}-info`).html();
    },
    title:
      function () {
        return $(`#${this.id}-title`).html();
      },
    placement: 'right',
    container: 'body'
  }).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
      $(_this).popover('hide');
    });
  }).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
      if (!$(".popover:hover").length) {
        $(_this).popover("hide");
      }
    }, 100);
  });
});

//Adiciona o evento click em todos os botoes dos popovers dos cursos
$('body').on('click', '.popover #add-cart', function () {
  loadCourse(this.parentElement.id); 
});

function insertHTMLContentCourseInfo(contentCourseInfo) {

  if (document.getElementById(`${contentCourseInfo.element.id}-info`) !== null) return;

  let whatLearnHTML = "";
  contentCourseInfo.whatLearn.forEach(e => {
    whatLearnHTML = whatLearnHTML +
      `<div class="my-0 d-flex">
      <a class="text-reset me-3" href="#"> <i class="fas fa-check"></i> </a>  
      <p>${e}</p>
     </div>`
  });

  let contentHTML = `<div id="${contentCourseInfo.element.id}-info" class="display-none">
                    <p class="my-0 fw-light">${contentCourseInfo.courseFeatures}</p>  
                    <p class="my-1">${contentCourseInfo.courseDescription}
                    <p class="my-1 mb-2 small-font-size"><b>O que você aprenderá</b></p>
                    ${whatLearnHTML}      
                    <div id="${contentCourseInfo.element.id}-add-cart" class="text-center">
                      <a class="btn btn-primary" id="add-cart">Adicionar ao carrinho</a> 
                    </div>   
                    </div>`;
  // Usado a tag <a> para o botão pois a tag button não funciona 
  // quando possui referência ao js do Material Design Bootstrap 
  //(<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/4.1.0/mdb.min.js"></script>) 
  contentCourseInfo.element.insertAdjacentHTML("beforeend", contentHTML);
};

// Habilita as animações do AOS
AOS.init({ duration: 1200 });

// Adiciona evento ao link Registre-se do modal de login para quando clicar direcionar a aba de registre-se
$('#register').on('click', function (e) {
  e.preventDefault()
  $('#tab-register').tab('show')
})