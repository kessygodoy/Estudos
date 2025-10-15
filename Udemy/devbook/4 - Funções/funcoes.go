package main

func somar(n1 int8, n2 int8) int8 {
	return n1 + n2
}

func calculosMatematicos(n1, n2 int8) (int8, int8) {
	soma := n1 + n2
	subtracao := n1 - n2
	return soma, subtracao
}

func main() {
	soma := somar(10, 20)
	println(soma)

	var f = func(txt string) string {
		println(txt)
		return txt
	}

	resultado := f("Texto da função 1") + " - " + f("Texto da função 2")
	println(resultado)

	resultadoSoma, resultadoSubtracao := calculosMatematicos(10, 15)
	println(resultadoSoma, resultadoSubtracao)
}
