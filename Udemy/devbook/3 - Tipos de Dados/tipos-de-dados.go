package main

func main() {
	numero := 999999999999999999
	var numeroint8 int8 = 127
	var numeroint16 int16 = 32767
	var numeroint32 int32 = 2147483647
	var numeroint64 int64 = 9223372036854775807
	println(numeroint8)
	println(numeroint16)
	println(numeroint32)
	println(numeroint64)
	println(numero)

	var numero2 uint = 10000
	println(numero2)

	//alias
	//INT32 = RUNE
	var numero3 rune = 1000
	println(numero3)

	//BYTE = UINT8
	var numero4 byte = 100
	println(numero4)

	var numeroReal1 float32 = 123.45
	println(numeroReal1)

	var numeroReal2 float64 = 123
	println(numeroReal2)

	numeroReal3 := 12345.67
	println(numeroReal3)

	var str string = "Texto"
	println(str)

	str2 := "Texto2"
	println(str2)

	char := 'B'
	println(char)

	var texto int16
	println(texto)

	var booleano1 bool
	println(booleano1)

	var booleano2 bool = true
	println(booleano2)

	var erro error
	println(erro)
}
