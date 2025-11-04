
function valuap(respuest) {
    var reto;
    if (parseInt(respuest) == this.correcta) {
        // var reto;
        alert("Es correcta");
        reto = true;
        return reto;
    } else {
        alert("Es false");
        return reto;
    }
}

function pregunta(pregun, respuesta1, respuesta2, respuesta3, respuesta4, correcta) {
    this.pregun = pregun;
    this.respuestas = [];
    this.respuestas[0] = respuesta1;
    this.respuestas[1] = respuesta2;
    this.respuestas[2] = respuesta3;
    this.respuestas[3] = respuesta4;
    this.correcta = parseInt(correcta);
    this.ocupado = false;
    this.valuap = valuap;
}

var retorno = [];
var preguntas = [];

preguntas[0] = new pregunta("(1) ¿Qué es la probabilidad según Devore?","A)La probabilidad es una rama de la aritmética que estudia los números enteros y sus propiedades para resolver ecuaciones aleatorias.","B) La probabilidad se define como la capacidad de predecir con certeza los resultados de cualquier experimento mediante el uso de fórmulas exactas.","C)La probabilidad es el estudio del azar y la incertidumbre, usada para cuantificar la posibilidad de que ocurra un evento.","D) La probabilidad es una medida subjetiva basada únicamente en la intuición o la opinión personal sobre si un evento ocurrirá o no.", 2);
preguntas[1] = new pregunta("(2) ¿Cuál es el rango numérico que puede tomar una probabilidad?","A) La probabilidad siempre está entre 0 y 1; 0 representa un evento imposible y 1 un evento seguro.","B) La probabilidad puede tomar cualquier valor mayor que 1 cuando el evento es muy probable.","C) El rango de la probabilidad se encuentra entre −1 y 1, dependiendo de si el evento es favorable o desfavorable.","D) La probabilidad sólo puede tomar valores enteros, ya que representa el número de veces que ocurre un evento.", 0);
preguntas[2] = new pregunta("(3) ¿Qué se entiende por experimento en probabilidad?","A) Un experimento en probabilidad es una prueba de laboratorio que siempre produce el mismo resultado sin variación.","B) Se entiende por experimento cualquier suceso planeado en el que se conoce de antemano el resultado con total certeza.","C)Es el procedimiento mediante el cual se demuestra una teoría matemática sin considerar el azar ni la variabilidad.","D) Es cualquier acción o proceso cuyo resultado está sujeto a la incertidumbre.", 3);
preguntas[3] = new pregunta("(4) ¿Qué es el espacio muestral?","A) El espacio muestral es el conjunto de eventos que ya ocurrieron en un experimento pasado.","B) Es el conjunto de todos los posibles resultados de un experimento aleatorio.","C) Se define como el número total de veces que se repite un experimento para confirmar un resultado.","D)El espacio muestral corresponde únicamente al resultado más probable de un experimento aleatorio." ,2);
preguntas[4] = new pregunta("(5) ¿Qué es un evento?","A) Un evento es el resultado exacto y único que se obtiene cada vez que se realiza un experimento.","B) Un evento es el conjunto completo de todos los resultados posibles en un experimento aleatorio.","C) Es un subconjunto del espacio muestral que contiene uno o más resultados posibles.","D) Se define como la probabilidad numérica que determina si un suceso ocurrirá o no.", 2);
preguntas[5] = new pregunta("(6) ¿Qué es un evento simple? ","A) Es aquel que consta de un solo resultado posible del espacio muestral.","B) Un evento simple es aquel que contiene todos los resultados posibles de un experimento aleatorio.","C) Es un suceso compuesto por varios resultados simultáneos dentro del espacio muestral.","D) Se denomina evento simple a cualquier suceso que no forma parte del espacio muestral.", 0);
preguntas[6] = new pregunta("(7) ¿Qué es un evento compuesto?","A) Un evento compuesto es aquel que no pertenece al espacio muestral ni tiene relación con los resultados posibles.","B) Se denomina evento compuesto al suceso que tiene únicamente un resultado posible dentro del experimento.","C) Es el evento que ocurre cuando todos los resultados del experimento son imposibles de observar.","D) Es aquel que consta de más de un resultado dentro del espacio muestral.", 3);
preguntas[7] = new pregunta("(8) ¿Qué significa un evento seguro?","A) Un evento seguro es aquel que nunca ocurre, sin importar las condiciones del experimento.","B) Es aquel que ocurre con certeza; incluye todos los resultados posibles del experimento.","C) Se considera evento seguro al que tiene probabilidad igual a cero, ya que es completamente imposible.","D) Un evento seguro es aquel que depende del azar y puede o no suceder según las circunstancias.", 1);
preguntas[8] = new pregunta("(9) Si lanzas un dado, ¿cuál es la probabilidad de que salga un número par?","A) El espacio muestral tiene 6 posibles resultados: {1,2,3,4,5,6}. Los pares son {2,4,6}, así que P= 3/6=0.5","B) El dado tiene 6 caras y los números pares son {1, 3, 5}, por lo tanto, la probabilidad es P= 3","C) Como los dados tienen números del 1 al 6, y solo el número 6 es par, la probabilidad es P= 1/6","D) Los números pares son {2, 4, 6}, pero como el dado puede caer en cualquier cara dos veces, la probabilidad es P=6/6=1", 0);
preguntas[9] = new pregunta("(10) Si tomas una carta al azar de una baraja de 52, ¿qué probabilidad hay de que sea un corazón?","A) (En una baraja de 52 cartas hay 10 corazones, por lo tanto, P=10/52=0.19","B) Si cada carta tiene el mismo valor de probabilidad y hay 4 palos, la posibilidad de sacar un corazón es P=1/52=0.019","C) Dado que los corazones son la mitad de la baraja, P=P=26/52=0.5 ","D) Hay 13 corazones en una baraja de 52. P=13/52=0.25", 3);
preguntas[10] = new pregunta("(11) De seis focos, dos están defectuosos. Si escoges uno al azar, ¿cuál es la probabilidad de que funcione bien?","A) Si hay 2 focos defectuosos, la probabilidad de que funcione bien es P=2/6=0.333","B) Hay 4 focos buenos de 6. P=4/6=0.6667","C) Como solo uno de los focos está en buen estado, P=1/6=0.1617","D) Todos los focos tienen la misma probabilidad de estar defectuosos, por lo tanto,P=6", 1);
preguntas[11] = new pregunta("(12) Si lanzas una moneda tres veces, ¿cuál es la probabilidad de que salgan exactamente dos caras?","A) P=C(3,2)(0.5)3=3(0.125)=0.375","B) P=C(3,2)(0.5)2= 3(0.25)=0.75","C) P=C(3,1)(0.5)3=3(0.125)=0.25","D) P=C(3,3)(0.5)3=1(0.125)=0.125", 0);
preguntas[12] = new pregunta("(13) En una urna hay 5 bolas rojas y 3 azules. Si eliges al azar, ¿qué probabilidad hay de que sea roja?","A) P=3/8=0.375, porque solo tres de las ocho bolas son rojas.","B) P=1/8=0.125, considerando que solo una bola puede ser elegida como roja.","C) P=8/8=1 ya que todas las bolas tienen el mismo color.","D) P=5/8=0.625", 3);
preguntas[13] = new pregunta("(14) Si la probabilidad de un evento es 0.3, ¿cuál es la probabilidad de que no ocurra?","A) P(Ac)=1−0.3=0.7.","B) P(Ac) = 1 - 0.7 = 0.3, porque el evento complementario siempre tiene la misma probabilidad que el evento original.","C) P(Ac) = 0.3, ya que se duplica la probabilidad cuando el evento no ocurre","D) P(Ac)=0.3+0.3=0.9, porque se suman las probabilidades del evento y su complemento.", 0);
preguntas[14] = new pregunta("(15) Al lanzar dos dados, ¿qué probabilidad hay de obtener una suma de 7.","A) Hay 12 combinaciones posibles que suman 7","B) Solo una combinación produce una suma de 7, así que P=1/36=0.0278","C) Hay 6 combinaciones posibles que suman 7. P=6/36=1/6=0.16671","D) odas las combinaciones posibles suman 7", 2);
preguntas[15] = new pregunta("(16) Si defines A= {1, 2, 3}  y B= {3, 4,5 }  al lanzar un dado, ¿qué probabilidad hay de que ocurra A o B?","A) A ∪ B={1, 2, 3, 4, 5,6}=P(6/6)=1","B) A ∪ B={1, 2, 3, 4, 5}= P=(5/6)=0.8333 ","C) A ∪ B={1,2}=P(2/6)=0.3333.","D) A ∪ B={4}=P(1/6)=0.1617.", 1);
preguntas[16] = new pregunta("(17) Si lanzas tres monedas, ¿cuántos resultados distintos puedes obtener?","A) 3^2=9","B) 2^2=4","C) 2^4=16","D) 2^3=8", 3);
preguntas[17] = new pregunta("(18) ¿Cuántas formas hay de ordenar las letras A, B, C y D?","A) A,B,C,D!=24, combinaciones.","B) 4","C) 4!=24","D) 25", 2);
preguntas[18] = new pregunta("(19) ¿Cuántas palabras distintas (permutaciones) se pueden formar con las letras A, B, C, D, E (todas usadas)?","A) 5!=120","B) 6!=720","C) 5","D) 25", 0);
preguntas[19] = new pregunta("(20) ¿Cuál es la media (valor esperado) de una distribución de Bernoulli con p=0.3?","A) Para Bernoulli, E[X]=1−pE[X] = 1 - p. Entonces E[X]=0.7","B) E[X]=0.09.","C) En una distribución de Bernoulli, E[X]=1","D) Para Bernoulli, E[X]=p. Entonces E[X]=0.3", 3);
preguntas[20] = new pregunta("(21) Calcula la varianza de una Binomial con n=10 y p=0.4","A) varianza=np=10*0.4=4","B) varianza=np(1-p)=10*0.4*0.6=2.4","C) varianza=n(1-p)=10*0.6=6","D) varianza=np(1+p)=10*0.4*1.4=5.6", 1);
preguntas[21] = new pregunta("(22) En una Poisson con λ =3 ¿Cual es P(X=2)?","A) P(2)=e^-3 (3^3/3!)=2.1406","B) P(2)=e^-2(2^3/2!)=0.2707","C) P(2)=e^-3(3^2/3!)=0.0747","D) P(2)=e^-3(3^2/2!)=0.22404", 3);
preguntas[22] = new pregunta("(23) En una distribución binomial con n=5n=5 y p=0.2p=0.2, ¿probabilidad de exactamente 1 éxito?","A) 0.10","B) 0.20","C) 0.4096","D) 0.50", 2);

preguntas[23] = new pregunta("(24) ¿Qué variables booleanas representan el número binario 1010?","A) BCD","B) A-C-.","C) 𝐴𝐵𝐶𝐷","D) AC.", 2);

preguntas[24] = new pregunta("(25) ¿Qué expresión representa un maxitérmino?","A) 𝑥𝑦𝑧","B) (x+y+z)","C) 𝑥𝑦𝑧 + 𝑥𝑦𝑧 + 𝑥𝑦𝑧 + 𝑥𝑦","D) 𝑥𝑦", 1);
preguntas[25] = new pregunta("(26) ¿Qué expresión representa un minitérmino?","A) 𝐼𝐽𝐾","B) 𝐼𝐽","C) 𝐼𝐽𝐾 + 𝐼𝐽𝐾","D) 𝐼𝐽𝐾 + 𝐼𝐽 + 𝐼𝐽𝐾 + 𝐼𝐽𝐾", 0);
preguntas[26] = new pregunta("(27) En el algebra booleana, la propiedad de absorción se expresa como:","A) A+ A=1","B) A*1=A","C) A+AB=A","D) A*A'=1", 2);
preguntas[27] = new pregunta("(28) ¿Qué característica tiene un mapa de Karnaugh de 4 variables?","A) Tiene doce celdas.","B) Tiene 8 combinaciones posibles.","C) Tiene 16 celdas.","D) Tiene 4 columnas y tres filas.", 2);
preguntas[28] = new pregunta("(29) Con ayuda del álgebra de Boole, seleccione la minimización correcta de la expresión booleana 𝑥𝑦𝑧 + 𝑥𝑦𝑧","A) xy","B) xz","C) x","D) y", 1);
preguntas[29] = new pregunta("(30) Seleccione la primera regla de comparación de grupos (en cuanto a diferencia de bits) del método de Quine-McCluskey","A) n con n + 1.","B) n con n + 2.","C) n con n - 1.","D) n con n - 2.", 0);
preguntas[30] = new pregunta("(31) En el último paso del método de minimización de Quine-McCluskey, ¿qué regla se tiene que seguir para obtener la fórmula booleana simplificada?","A) Las implicaciones con dos X en la misma columna de algún valor binario, se incluyen como un minitérmino.","B) Las implicaciones con una X en la misma columna de algún valor binario, se incluyen como un minitérmino.","C) La implicación con una X en la misma columna de algún valor binario, se incluye como término canónico.","D) La implicación con dos X en la misma columna de algún valor binario, se incluye como término canónico.", 0);
preguntas[31] = new pregunta("(32) En el método de Quine-McCluskey, ¿qué nombre reciben los términos obtenidos en la representación en bits, traducidos a variables booleanas?","A) Expresión booleana.","B) Implicante.","C) Minitérmino.","D) Resultante.", 1);
preguntas[32] = new pregunta("(33) En un diagrama de Karnaugh de dos variables, ¿qué conectivo se usa en caso de que existan dos posibles resultados?","A) .¬","B) .·","C) .∧","D) ∨", 3);
preguntas[33] = new pregunta("(34) ¿Cuántas tablas de diferenciación puede tener una función booleana en el método de Quine-McCluskey?","A) De una a cuatro.","B) Menos de tres.","C) De una a tres.","D) Más de tres.", 3);
preguntas[34] = new pregunta("(35) Seleccione una de las condiciones para que el método de Quine-McCluskey sea válido","A) Los implicantes deben contener todas las variables booleanas de la fórmula inicial.","B) Todas las columnas de valores decimales deben tener al menos una X.","C) El resultado final solo contiene a los implicantes obtenidos en la última tabla de diferenciación.","D) La regla de comparación para la diferenciación de cadenas de bits es n contra n - 1.", 1);
preguntas[35] = new pregunta("(36) Dos valores _____son válidos en el método de Quine-McCluskey si, comparados, difieren en ______.","A) Binarios, un bit.","B) Binarios, dos bits.","C) Binarios, un guión.","D) Binarios, dos guiones.", 0);
preguntas[36] = new pregunta("(37) ¿Cuál es el orden correcto de los valores binarios de dos variables booleanas en un diagrama de Karnaugh?","A) 00, 01, 10, 11.","B) 01, 10, 11, 00.","C) 00, 01, 11, 10.","D) 00, 11, 10, 01.", 2);
preguntas[37] = new pregunta("(38) ¿Qué fórmula permite saber cuántos renglones contiene una tabla de verdad, sabiendo que n es igual al número de variables booleanas en cuestión?", "A) n2", "B) 22n", "C) 2n", "D) 2ⁿ", 3);
preguntas[38] = new pregunta("(39) ¿Cuántos renglones tendría una tabla de verdad de una fórmula booleana con ocho variables diferentes?", "A) 256", "B) 128", "C) 64", "D) 512", 0);
preguntas[39] = new pregunta("(40) ¿Qué número decimal representa el número binario 100?", "A) 5", "B) 2", "C) 4", "D) 3", 2);
preguntas[40] = new pregunta("(41) ¿Cuál es la característica más importante para organizar una tabla de diferenciación en el método de Quine-McCluskey, de mayor a menor?", "A) Términos", "B) Grupos", "C) Cadena de bits", "D) Número de unos", 3);
preguntas[41] = new pregunta("(42) El diagrama de Karnaugh también se le conoce como:", "A) J-Diagrama", "B) E-Diagrama", "C) K-Diagrama", "D) N-Diagrama", 2);
preguntas[42] = new pregunta("(43) Se le llama minimización booleana a:", "A) Al proceso de obtener restas", "B) Al proceso de obtener divisiones", "C) Al proceso de simplificar expresiones booleanas para reducir el número de términos o variables", "D) Al proceso de obtener restas menores", 2);
preguntas[43] = new pregunta("(44) ¿Dónde nació George Boole?", "A) En Estados Unidos", "B) En Alemania", "C) En Reino Unido", "D) En Polonia", 2);
preguntas[44] = new pregunta("(45) ¿Quién demostró que se podían utilizar las reglas de la lógica para diseñar circuitos?", "A) Maurice Karnaugh", "B) Claude Shannon", "C) George Boole", "D) August De Morgan", 1);
preguntas[45] = new pregunta("(46) ¿Cuáles son las tres operaciones fundamentales del álgebra de Boole?", "A) Complemento, Suma booleana, Producto booleano", "B) Resta booleana, División booleana, Elemento neutro", "C) De morgan, Conmutativa, Acotación", "D) Absorción, Inversión para el uno, Complemento neutro", 0);
preguntas[46] = new pregunta("(47) ¿Quién contribuyó de manera considerable al avance de la lógica?", "A) Maurice Karnaugh", "B) Claude Shannon", "C) August De Morgan", "D) George Boole", 2);
preguntas[47] = new pregunta("(48) ¿Qué ley creó August de Morgan?", "A) Conmutativa", "B) Asociativa", "C) Distributiva", "D) De Morgan", 3);
preguntas[48] = new pregunta("(49) ¿Dónde nació Maurice Karnaugh?", "A) Viena", "B) Houston", "C) Nueva York", "D) Edimburgo", 2);
preguntas[49] = new pregunta("(50) ¿Cuál es el objetivo principal de minimizar una función booleana?", "A) Reducir la cantidad de compuertas lógicas necesarias.", "B) Obtener una tabla de verdad equivalente", "C) Aumentar el número de combinaciones posibles", "D) Generar una función redudante", 0);


