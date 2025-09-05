package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Row struct {
	Expression string `json:"expression"`
	Answer     string `json:"answer"`
}

var bd []Row

func main() {
	router := gin.Default()

	router.POST("/calculate", calculateExpression)

	router.GET("/history", getHistory)
	router.GET("/health", healthCheck)
	router.OPTIONS("/calculate", auto200)
	router.OPTIONS("/history", auto200)

	err := router.Run("0.0.0.0:8080")
	if err != nil {
		return
	}
}

func auto200(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	c.Header("Access-Control-Allow-Credentials", "true")
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "healthy",
		"service": "memtool-server",
	})
}

func setAnswer(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"answer": message,
	})
}

func getHistory(c *gin.Context) {
	fmt.Println(c.Request.Header)

	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	c.Header("Access-Control-Allow-Credentials", "true")

	data, err := json.Marshal(bd)
	if err != nil {
		setAnswer(c, http.StatusInternalServerError, "json making error")
		return
	}
	c.JSON(http.StatusOK, string(data))
}

func calculateExpression(c *gin.Context) {
	fmt.Println(c.Request.Header)

	c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	c.Header("Access-Control-Allow-Credentials", "true")

	body, err := ioutil.ReadAll(c.Request.Body)

	if err != nil {
		setAnswer(c, http.StatusInternalServerError, "body reading error")
		return
	}

	var expected struct {
		Expression string `json:"expression"`
	}

	err = json.Unmarshal(body, &expected)

	if err != nil {
		setAnswer(c, http.StatusInternalServerError, "json parsing error")
		return
	}

	ans, err := calculate(expected.Expression)

	if err != nil {
		setAnswer(c, http.StatusBadRequest, err.Error())
		bd = append(bd, Row{expected.Expression, err.Error()})
		return
	}

	setAnswer(c, http.StatusOK, fmt.Sprintf("%v", ans))
	bd = append(bd, Row{expected.Expression, fmt.Sprintf("%v", ans)})

}
