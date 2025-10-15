package main

func main() {
	var variavel1 string = "Variável 1"
	variavel2 := "Variável 2"

	println(variavel1)
	println(variavel2)

	var (
		variavel3 string = "lalala"
		variavel4 string = "lalala"
	)

	println(variavel3, variavel4)

	variavel5, variavel6 := "Variável 5", "Variável 6"

	println(variavel5, variavel6)

	const constante1 string = "Constante 1"
	println(constante1)

}
