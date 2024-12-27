package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

type Nota struct {
	Title string
	Url   string
}

const PATH_NOTES = "public/notas/pages/"

var NotasTotales = [][]Nota{
	{
		{Title: "Campo Electrico parte 1", Url: "CE_1"},
		{Title: "Campo Electrico parte 2", Url: "1"},
		{Title: "Dipolo en un campo eléctrico", Url: "2"},
		{Title: "Distribuciones de carga parte 1", Url: "3"},
		{Title: "Distribuciones de carga parte 2", Url: "4"},
		{Title: "Distribuciones de carga parte 3", Url: "5"},
		{Title: "Lineas de fuerza", Url: "6"},
		{Title: "Notas extras", Url: "7"},
		{Title: "Nuevas identidades de aprendizaje en la era digital", Url: "8"},
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
	r := gin.Default()

	r.StaticFS("/public", http.Dir("./public"))
	r.Static("/static", "./public/static")
	r.LoadHTMLFiles("public/notas/notas.html")

	router(r)

	r.Run()
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
