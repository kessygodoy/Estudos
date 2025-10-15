package main

import (
	"modulo/auxiliar"

	"github.com/badoux/checkmail"
)

func main() {
	println("Escrevendo do arquivo main")
	auxiliar.Escrever()

	erro := checkmail.ValidateFormat("kessyon@gmail.com")
	println(erro)
}
