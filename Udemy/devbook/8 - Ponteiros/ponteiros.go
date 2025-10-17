package main

func main() {
	println("Ponteiros")

	var variavel1 int = 10
	var variavel2 int = variavel1

	println(variavel1, variavel2)

	// PONTEIRO É UMA REFERENCIA DE MEMÓRIA
	var variavel3 int
	var ponteiro *int

	variavel3 = 100
	ponteiro = &variavel3

	println(variavel3, ponteiro)
}
