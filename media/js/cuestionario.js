
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
preguntas[23] = new pregunta("(24) Si X∼Geometrica(p=0.4)¿probabilidad de que el primer éxito ocurra en el segundo intento?","A) 0.16","B) 0.24","C) 0.30","D) 0.50", 1);
preguntas[24] = new pregunta("(25) Si en promedio ocurren 5 llamadas por minuto, ¿probabilidad de que ocurran exactamente 3?","A) 0.10","B) 0.15","C) 0.14","D) 0.25", 2);
preguntas[25] = new pregunta("(26) ¿Qué es la probabilidad condicional?","A) Es la probabilidad de que ocurra un evento sin importar otro.","B) Es la probabilidad de que ocurra un evento A, dado que ya ocurrió B.","C) Es la suma de dos probabilidades independientes.","D) Es la diferencia entre dos probabilidades complementarias.", 1);
preguntas[26] = new pregunta("(27) ¿Cuál es la fórmula matemática básica de la probabilidad condicional?","A) P(A∪B)=P(A)+P(B)","B) P(A|B)=P(A∩B)/P(B)","C) P(A|B)=P(A)P(B)","D) P(A|B)=1-P(A∩B)", 1);
preguntas[27] = new pregunta("(28) ¿Qué expresa la fórmula P(AB)=P(A|B)P(B)?","A) El teorema de Bayes.","B) La regla del complemento.","C) El teorema de multiplicación de probabilidades.","D) La ley de probabilidad total.", 2);
preguntas[28] = new pregunta("(29) ¿Cuál es la versión simétrica del teorema de multiplicación?","A) P(AB)=P(B|A)P(B)","B) P(AB)=P(B|Å)P(A)","C) P(AB)=P(A|B)P(A)","D) P(AB)=P(A|B)+P(B|A)", 0);
preguntas[29] = new pregunta("(30) ¿Qué establece la Ley de la Probabilidad Total (LPT)?","A) Que la suma de todas las probabilidades posibles es infinita.","B) Que la probabilidad de un evento se obtiene como suma ponderada de probabilidades condicionales respecto a una partición del espacio muestral.","C) Que todos los eventos son mutuamente excluyentes.","D) Que la probabilidad total siempre es 1.", 1);
preguntas[30] = new pregunta("(31) ¿Para qué sirve el Teorema de Bayes?","A) Para calcular la probabilidad de la unión de dos eventos.","B) Para invertir una probabilidad condicional y actualizarla con nueva información.","C) Para estimar la media de una distribución.","D) Para calcular probabilidades sin datos previos.", 1);
preguntas[31] = new pregunta("(32) En un lote de 100 piezas, 10 son defectuosas. Si tomas una sin reemplazo, ¿cuál es la probabilidad de que salga defectuosa?","A) P=0.01","B) P=0.","C) P=0.10","D) P=0.90", 2);
preguntas[32] = new pregunta("(33) Un examen médico tiene una tasa de acierto del 95% y un 5% de falsos positivos. Si la enfermedad afecta al 1% de la población, ¿qué probabilidad hay de estar enfermo si la prueba sale positiva?","A) 0.01 (1%)","B) 0.16 (16%)","C) 0.05 (5%)","D) 0.84 (84%)", 1);
preguntas[33] = new pregunta("(34) Si lanzas tres monedas y sabes que la primera fue cruz, ¿qué probabilidad hay de que salga al menos una cara en las otras dos?","A) 0.25","B) 0.50","C) 0.75","D) 1.00", 2);
preguntas[34] = new pregunta("(35) Una prueba detecta una enfermedad con sensibilidad 95% y especificidad 98%. La prevalencia es 0.1%. Si una persona da positivo, ¿qué probabilidad tiene realmente de estar enferma?","A) 0.001 (0.1%)","B) 0.045 (4.5%)","C) 0.20 (20%)","D) 0.95 (95%)", 1);
preguntas[35] = new pregunta("(36) Dos turnos producen las piezas: T1 (40%, 1% defectos) y T2 (60%, 3% defectos). Si una pieza es defectuosa, ¿cuál es la probabilidad de que provenga del turno T2?","A) 0.22 (22%)","B) 0.50 (50%)","C) 0.82 (81.82%)","D) 0.18 (18%)", 2);
preguntas[36] = new pregunta("(37) En una fábrica, la máquina M produce 40% de la producción con 1% defecto; N produce 60% con 4% defecto. Si una pieza es defectuosa, ¿qué probabilidad proviene de N?","A) 0.14 (14%)","B) 0.50 (50%)","C) 0.86 (85.71%)","D) 0.99 (99%)", 2);
preguntas[37] = new pregunta("(38) Se eligen 3 alumnos al azar. La probabilidad de aprobar dado que estudian es 0.9 y si no estudian 0.4. Si el 70% estudian, ¿cuál es la probabilidad de aprobar?", "A) 0.45", "B) 0.60", "C) 0.75", "D) 0.90ⁿ", 2);
preguntas[38] = new pregunta("(39) Si dos eventos son independientes y P(A)=0.4, P(B)=0.5.¿Qué probabilidad tienen de ocurrir ambos?", "A) 0.25", "B) 0.20", "C) 0.10", "D) 0.50", 1);
preguntas[39] = new pregunta("(40) En una población, el 10% tiene una enfermedad. Un test detecta correctamente el 90% de los enfermos y da falso positivo en 5% de los sanos. Si una persona da positivo, ¿probabilidad de estar enfermo?", "A) 0.67 (67%)", "B) 0.50", "C)  0.33", "D) 0.90", 0);
preguntas[40] = new pregunta("(41) Un estudio indica que el 25% de las personas practica deporte. De los deportistas, 80% son saludables; de los no deportistas, 60%. Si una persona es saludable, ¿qué probabilidad de que practique deporte?", "A) Si una persona es saludable, ¿qué probabilidad de que practique deporte?", "B) 0.33", "C) 0.31 (31%)", "D) 0.50", 2);
preguntas[41] = new pregunta("(42) El 1% de los correos electrónicos son spam. Un filtro detecta correctamente 98% del spam y marca 3% de los normales como spam. Si un correo fue marcado como spam, ¿probabilidad de que realmente lo sea?", "A) 0.25 (25%)", "B) 0.50", "C) 0.70", "D) 0.90", 0);
preguntas[42] = new pregunta("(43) Si P(A)=0.4, P(B)=0.5 y  P(A∩B)=0.2 ¿los eventos A y B son independientes?", "A) Sí, porque P(A)P(B)=P(A∩B)", "B) No, porque son mutuamente excluyentes", "C)No, porque 0.4 ≠ 0.5", "D) No se puede determinar", 0);
preguntas[43] = new pregunta("(44) En una empresa, 10% de los empleados son ingenieros y 90% no lo son. El 80% de los ingenieros sabe inglés, y solo el 10% de los no ingenieros lo sabe. Si una persona sabe inglés, ¿probabilidad de que sea ingeniero?", "A) 0.10", "B) 0.30", "C) 0.47 (47%)", "D) 0.80", 2);
preguntas[44] = new pregunta("(45) El 60% de los empleados son mujeres. El 10% de las mujeres y el 5% de los hombres están de vacaciones. Si se elige a alguien de vacaciones, ¿probabilidad de que sea mujer?", "A) 0.30 (30%)", "B) 0.67 (67%)", "C) 0.50 (50%)", "D) 0.90 (90%)", 1);
preguntas[45] = new pregunta("(46) Un examen consta de 10 preguntas. La probabilidad de acertar cada una es 0.8. Si sabes que acertó al menos 1, ¿probabilidad de que haya acertado exactamente 2?", "A) 0.20 (20%)", "B) 0.30 (30%)", "C) 0.40 (40%)", "D) 0.10 (10%)", 1);
preguntas[46] = new pregunta("(47) ¿Si P(A)=0.5, P(B)=0.3 y P(A|B)=00.4, ¿cuál es P(A∩B)?", "A) 0.10", "B) 0.12", "C) 0.20", "D) 0.40", 1);
preguntas[47] = new pregunta("(48) La probabilidad de que un alumno llegue tarde es 0.25. Si llueve, la probabilidad de llegar tarde sube a 0.6; si no llueve, es 0.2. Si hoy llegó tarde, ¿cuál es la probabilidad de que haya llovido, sabiendo que llueve 30% de los días?", "A) 0.30", "B) 0.46", "C) 0.20", "D) 0.60", 1);
preguntas[48] = new pregunta("(49) Una alarma suena 99% de las veces que hay fuego y 1% sin fuego. Si la probabilidad de incendio es 2%, ¿P(fuego | suena)?", "A) 0.10", "B) 0.50", "C) 0.67", "D) 0.90", 2);
preguntas[49] = new pregunta("(50) Dos fábricas, A y B, producen el 30% y 70% de los tornillos, con tasas de defectos de 1% y 4%, respectivamente. Si un tornillo es defectuoso, ¿probabilidad de que provenga de la fábrica B?", "A) 0.40", "B) 0.60", "C) 0.74", "D) 0.85", 2);



