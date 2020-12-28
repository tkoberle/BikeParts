kubectl delete namespace bikeparts-dev

kubectl create namespace bikeparts-dev

kubectl config set-context bikeparts-dev --namespace=development \
  --cluster=minikube \
  --user=minikube

  kubectl create -f bikes-k8s.yaml --namespace=bikeparts-dev
