library(shiny)

pages <- c("home", "profil-organisasi", "sejarah", "struktur-organisasi", "pengurus-inti", "departemen", "media-informasi", "eksternal", "penalaran", "pengembangan-organisasi", "pengembangan-minat-bakat", "kewirausahaan", "aspirasi-sosial-advokasi", "info-lomba", "info-magang", "aspirasi-mahasiswa", "konsultasi-statistik", "visi-misi")

read_html <- function(path) {
  HTML(paste(readLines(path, warn = FALSE, encoding = "UTF-8"), collapse = "\n"))
}

ui <- tagList(
  tags$head(
    tags$meta(charset = "UTF-8"),
    tags$meta(name = "viewport", content = "width=device-width, initial-scale=1.0"),
    tags$title("HIMASTA UNTIRTA | Kabinet Konfidensi 2025"),
    tags$link(rel = "preconnect", href = "https://fonts.googleapis.com"),
    tags$link(rel = "preconnect", href = "https://fonts.gstatic.com", crossorigin = "anonymous"),
    tags$link(
      href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      rel = "stylesheet"
    ),
    tags$link(rel = "stylesheet", href = "css/style.css"),
    tags$script(src = "script.js", defer = NA)
  ),
  read_html("www/partials/header.html"),
  uiOutput("page_content"),
  read_html("www/partials/footer.html")
)

server <- function(input, output, session) {
  current_page <- reactiveVal("home")

  observeEvent(input$nav_page, {
    requested_page <- input$nav_page
    if (is.character(requested_page) && length(requested_page) == 1 && requested_page %in% pages) {
      current_page(requested_page)
    }
  }, ignoreInit = TRUE)

  output$page_content <- renderUI({
    page_path <- file.path("www", "pages", paste0(current_page(), ".html"))
    if (!file.exists(page_path)) page_path <- file.path("www", "pages", "home.html")
    read_html(page_path)
  })
}

shinyApp(ui = ui, server = server)
