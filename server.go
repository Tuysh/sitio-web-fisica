package main

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/net/html"
)

type Nota struct {
	Title string
	Url   string
}

type SearchResult struct {
	Title    string `json:"title"`
	Path     string `json:"path"`
	Fragment string `json:"fragment"`
}

const PATH_NOTES = "public/notas/pages/"

var NotasTotales = [][]Nota{
	{
		{Title: "Campo Electrico parte 1", Url: "CE_1"},
		{Title: "Campo Electrico parte 2", Url: "CE_2"},
		{Title: "Dipolo en un campo eléctrico", Url: "CE_3"},
		{Title: "Distribuciones de carga parte 1", Url: "CE_4"},
		{Title: "Distribuciones de carga parte 2", Url: "CE_5"},
		{Title: "Distribuciones de carga parte 3", Url: "CE_6"},
		{Title: "Lineas de fuerza", Url: "CE_7"},
		{Title: "Notas extras", Url: "CE_8"},
		{Title: "Nuevas identidades de aprendizaje en la era digital", Url: "CE_9"},
	},
	{
		{Title: "POTENCIAL ELÉCTRICO primera parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO segunda parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO tercera parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO cuarta parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO quinta parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO sexta parte", Url: "0"},
		{Title: "POTENCIAL ELÉCTRICO septima parte", Url: "0"},
	},
}

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.StaticFS("/public", http.Dir("./public"))
	r.Static("/static", "./public/static")
	r.LoadHTMLFiles("public/notas/notas.html")

	router(r)

	r.SetTrustedProxies(nil)
	log.Println("OK :)")
	r.Run(":7070")
}

func router(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		c.File("public/index.html")
	})

	simuladores := r.Group("/simuladores")
	{
		simuladores.GET("/", func(c *gin.Context) {
			c.File("public/simuladores/index.html")
		})

		simuladores.GET("/campo-electrico", func(c *gin.Context) {
			c.File("public/simuladores/campo-electrico/index.html")
		})

		simuladores.GET("/repulsion", func(c *gin.Context) {
			c.File("public/simuladores/repulsion/index.html")
		})
	}

	notas := r.Group("/notas")
	{
		notas.GET("/", func(c *gin.Context) {

			result, err := findFile("home" + ".html")
			if err != nil {
				return
			}

			c.HTML(http.StatusOK, "notas.html", gin.H{
				"Campo":     NotasTotales[0],
				"Potencial": NotasTotales[1],
				"Contenido": "/" + result,
			})
		})

		notas.GET("/:name", func(c *gin.Context) {

			result, err := findFile(c.Param("name") + ".html")
			if err != nil {
				return
			}

			c.HTML(http.StatusOK, "notas.html", gin.H{
				"Campo":     NotasTotales[0],
				"Potencial": NotasTotales[1],
				"Contenido": "/" + result,
			})
		})
	}

	r.GET("/api/search", func(c *gin.Context) {
		query := c.Query("q")
		if query == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
			return
		}

		results, err := searchInFiles(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, results)
	})

	r.GET("/hello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})
}

func findFile(filename string) (string, error) {
	found := false
	var result string

	err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if strings.EqualFold(info.Name(), filename) {
			result = filepath.ToSlash(path)
			found = true
		}
		return nil
	})

	if err != nil {
		return "", fmt.Errorf("error al buscar: %v", err)
	}

	if !found {
		fmt.Printf("No se encontró el archivo: %s\n", filename)
	}

	return result, nil
}

func extractText(r io.Reader) (string, error) {
	var buf bytes.Buffer
	tokenizer := html.NewTokenizer(r)

	for {
		tokenType := tokenizer.Next()
		if tokenType == html.ErrorToken {
			if tokenizer.Err() == io.EOF {
				break
			}
			return "", tokenizer.Err()
		}

		if tokenType == html.TextToken {
			text := strings.TrimSpace(string(tokenizer.Text()))
			if text != "" {
				buf.WriteString(text + " ")
			}
		}
	}
	return buf.String(), nil
}

func searchInFiles(query string) ([]SearchResult, error) {
	var results []SearchResult
	basePath := "./public/notas"

	err := filepath.Walk(basePath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(path, ".html") {
			file, err := os.Open(path)
			if err != nil {
				return err
			}
			defer file.Close()

			content, err := extractText(file)
			if err != nil {
				return err
			}

			if strings.Contains(strings.ToLower(content), strings.ToLower(query)) {
				index := strings.Index(strings.ToLower(content), strings.ToLower(query))
				start := index - 50
				if start < 0 {
					start = 0
				}
				end := index + len(query) + 50
				if end > len(content) {
					end = len(content)
				}
				fragment := content[start:end]

				results = append(results, SearchResult{
					Title:    filepath.Base(path),
					Path:     filepath.ToSlash(path),
					Fragment: "..." + fragment + "...",
				})
			}
		}
		return nil
	})

	return results, err
}
