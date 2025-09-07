package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
)

var bd DataBase

func main() {
	router := gin.Default()

	redisAddr := os.Getenv("REDIS_ADDR")
	redisPass := os.Getenv("REDIS_PASS")
	serverAddr := os.Getenv("SERVER_ADDR")

	fmt.Println(redisAddr, redisPass, serverAddr)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	bd = NewRedisStore(ctx, redisAddr, redisPass)
	defer bd.Close()

	router.POST("/calculate", calculateExpression)

	if err := router.Run(serverAddr); err != nil {
		log.Fatal(err)
	}
}

func setAnswer(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{
		"answer": message,
	})
}

func calculateExpression(c *gin.Context) {
	var req struct {
		Expression string `json:"expression"`
	}

	if err := c.ShouldBind(&req); err != nil {
		setAnswer(c, http.StatusBadRequest, "invalid json")
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	calculatedAnswer, err := bd.GetCalculation(ctx, req.Expression)
	if err == nil {
		log.Printf("We got calculated answer for expression [%s]: %s\n", req.Expression, calculatedAnswer.Answer)
		if calculatedAnswer.IsCorrect {
			setAnswer(c, http.StatusOK, calculatedAnswer.Answer)
		} else {
			setAnswer(c, http.StatusBadRequest, calculatedAnswer.Answer)
		}
		return
	}

	ans, err := calculate(req.Expression)
	if err != nil {
		value2store := StoredValue{Answer: err.Error(), IsCorrect: false}
		_ = bd.AddCalculation(ctx, req.Expression, value2store)
		log.Printf("We got error for expression [%s]: %s\n", req.Expression, err.Error())
		setAnswer(c, http.StatusBadRequest, err.Error())
		return
	}

	value2store := StoredValue{Answer: fmt.Sprintf("%v", ans), IsCorrect: true}
	if err := bd.AddCalculation(ctx, req.Expression, value2store); err != nil {
		log.Printf("We got error in saving expression [%s]; Error: [%s]\n", req.Expression, err.Error())
	}

	setAnswer(c, http.StatusOK, fmt.Sprintf("%v", ans))
}
