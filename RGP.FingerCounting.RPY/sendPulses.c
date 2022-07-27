#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "irslinger.h"

int main(int argc, char *argv[])
{
	uint32_t outPin = 18;            
	int frequency = 38000;          
	double dutyCycle = 0.5;                             
	                           
	int *data;
	int size = argc-1;
	data=(int*)calloc(size,sizeof(int));
	for(int i = 1; i < size+1; ++i){
		data[i-1] = atoi(argv[i]);
		data[i-1] = data[i-1]/2;
	}

	
	printf("%d\n", size);
	for(int i = 0; i < size; ++i){
		printf("%d ",data[i]);
	}
	int result = irSlingRaw(
		outPin,
		frequency,
		dutyCycle,
		data,
		size);
	
	return result;
}
