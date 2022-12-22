#include <stdio.h>
#include <stdlib.h>  // for atof
#include <math.h>

// void rose (double K, double t, double &x, double &y)
// // K, t: call by value
// // x, y: call by reference
// {	
// 	x = cos (K*t)*cos(t);
// 	y = cos (K*t)*sin(t);
// }

// int main(int argc, char *argv[]) {
//     if ( argc != 3 ) {
//     	printf("%d", 0);
// 		exit (1);
//     }else {
// 		double x, y;
// 		double K = atof (argv[1]);
//     	double t = atof (argv[2]);
// 		rose (K, t, x, y);
//         printf("%lf %lf", x, y);
//     }
//     exit(0);
// }
void rectangle (double &x, double &y ) {
//   pos.add(vel.clone().multiplyScalar(dt));
  if (x > 70 || x < -70)
    x *= -1;
  if (y > 70 || y < -70)
    y *= -1;

//   if (pos.x > 0)
//     circle.material.color.set('cyan');
//   else
//     circle.material.color.set('yellow');
}
int main(int argc, char *argv[]) {
    if ( argc != 4 ) {
    	printf("%d", 0);
		exit (1);
    }else {
		double x = atof (argv[1]);
    	double y = atof (argv[2]);
	
		rectangle (x, y);
        printf("%lf %lf", x, y);
    }
    exit(0);
}