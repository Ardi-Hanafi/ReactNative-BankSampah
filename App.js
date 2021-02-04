import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback, } from 'react'
import { 
  Image, ImageBackground,
  StyleSheet,
  Button,
  View, SafeAreaView, ScrollView,
  Text, 
  TextInput,
  Alert,  Modal,
  TouchableOpacity, TouchableHighlight,
  YellowBox,
  ViewBase,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient'
// QR CODE ===================================================================================================================
import QRCode from 'react-native-qrcode-svg';

// FIREBASE LOGIN  ===========================================================================================================
import TextInput2 from './src/components/TextInput'
import firebase from 'firebase/app'
import 'firebase/auth'
import { emailValidator } from './src/helpers/emailValidator'
import { passwordValidator } from './src/helpers/passwordValidator'
import { loginUser } from './src/api/auth-api'
import { logoutUser } from './src/api/auth-api'
import Toast from './src/components/Toast'
// FIREBASE CHAT ============================================================================================================
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
// import * as firebase from 'firebase'
import 'firebase/firestore'
import { color } from 'react-native-reanimated';
 
const firebaseConfig = {
  apiKey: "AIzaSyDBSgC2uXU8tXXc2hmenOwfHmvS12ar4IU",
  authDomain: "test-firebase-ardi.firebaseapp.com",
  databaseURL: "https://test-firebase-ardi.firebaseio.com",
  projectId: "test-firebase-ardi",
  storageBucket: "test-firebase-ardi.appspot.com",
  messagingSenderId: "218757218270",
  appId: "1:218757218270:web:bcba77dc482a325e21e74f"
}
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
// YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
const db = firebase.firestore()
const chatsRef = db.collection('BsMessage')
// END FIREBASE CHAT ================================================================================================


 
export default function App() {

    function HomeScreen({ navigation }) {
      // QR CODE GENERATOR ===========================================================================================
      const QRlogo = require('./assets/logo-per.png')
      const QRtext = "PjK2eLRkuihzijlgI3s29ofemrB2"
      // MODAL HOME ===========================================================================================
      const [modalSetor, setModalVisibleSetor] = useState(false);
      const [modalTarik, setModalVisibleTarik] = useState(false);
      const [modalBayar, setModalVisibleBayar] = useState(false);
      const [modalBesi, setModalVisibleBesi] = useState(false);
      const [modalKaca, setModalVisibleKaca] = useState(false);
      const [modalKertas, setModalVisibleKertas] = useState(false);
      const [modalPlastik, setModalVisiblePlastik] = useState(false);

      return (
        <SafeAreaView style={{ height:'100%', backgroundColor:'#eeeeee', flex:1,}}>
        <ScrollView>
          <View style={{marginBottom:100,}}>
            <Image source={require('./assets/setor/hd-setor.png')} style={{
              position:'absolute',
              width:'100%', height:'8%',
              top:0, left:0
            }}></Image>
            <Text style={{
              fontSize:20, 
              fontWeight:'bold',
              color:'#fff', 
              marginTop:30,
              textAlign:'center',
            }}>Bank Sampah</Text>

            <View style={{position:'relative', marginTop:20}}>
              <LinearGradient colors={[ '#05B8E6', '#33D9B2' ]} style={{
                width:'90%', height:50,
                left:'5%', top:40,
                borderRadius:10,
                shadowColor:'#000000',
                shadowOffset: { width: 6,height: 6},
                shadowOpacity: 0.7,
                shadowRadius: 10,
                elevation: 6,
              }}>
                <View style={{
                  position:'absolute', left:0, top:0,
                  backgroundColor:'#fff',
                  height:'100%', width:'20%',
                  alignItems:'center', justifyContent:'center',
                  borderTopLeftRadius:10, borderBottomLeftRadius:10,
                }}>
                  <Image source={require('./assets/home/pp.png')} style={{
                    position:'relative',
                    width:40, height:40,
                  }}></Image>
                </View>
                <View style={{
                  position:'absolute', right:0, top:0,
                  height:'100%', width:'80%',
                  alignItems:'center', justifyContent:'center',
                  borderTopRightRadius:10, borderBottomRightRadius:10,
                }}>
                  <Text style={{
                    position:'relative',
                    fontSize:18, 
                    fontStyle:'normal',
                    color:'#fff',
                  }}>Nama Akun</Text>
                </View>
              </LinearGradient>
            </View>

            {/* VIEW SALDO POINT  ================================================== */}
            <View style={{ alignItems:'center', marginTop:70 }}>
              <LinearGradient colors={[ '#05B8E6', '#33D9B2' ]} style={{
                width:'90%', height:112, borderRadius:15,
                flexDirection:'row',
                shadowColor:'#000000',
                shadowOffset: { width: 6,height: 6},
                shadowOpacity: 0.7,
                shadowRadius: 10,
                elevation: 6,
              }}>
                <View style={{
                  position:'absolute',
                  backgroundColor:'#fff',
                  width:2, height:90,
                  left:'50%', top:10,
                  opacity:0.7,
                }}></View>
                <View style={{
                  height:'100%', width:'50%',
                  alignItems:'center', flexDirection:'column', 
                  justifyContent:'space-evenly', backgroundColor:'transparent'
                }}>
                  <Image source={require('./assets/home/rupiah.png')} style={{
                    width:51.5, height:30,
                  }}></Image>
                  <Text style={{
                    fontSize:18, 
                    fontStyle:'normal',
                    color:'#fff',
                  }}>Rp. 100.000</Text>
                </View>
                <View style={{
                  height:'100%', width:'50%',
                  alignItems:'center', flexDirection:'column', 
                  justifyContent:'space-evenly', backgroundColor:'transparent'
                }}>
                  <Image source={require('./assets/home/coin.png')} style={{
                    width:34.5, height:35,
                  }}></Image>
                    <Text style={{
                    fontSize:18, 
                    fontStyle:'normal',
                    color:'#fff',
                  }}>1.500 point</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={{
              width:'100%', 
              alignItems:'center',
              marginTop:30,
            }}>
              <LinearGradient 
                colors={[ '#05B8E6', '#33D9B2' ]} 
                style={{
                  width:'100%',
                  height:289,
                  position:'absolute',
                  top:25}}>
              </LinearGradient>
              <View style={{
                width: 250, height:50,
                backgroundColor:'#fff',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:7,
                shadowColor:'#fff',
                shadowOffset: { width: 6,height: 6},
                shadowOpacity: 0.7,
                shadowRadius: 10,
                elevation: 6,
              }}>
                <Text style={{
                  fontSize:18,
                  color:'#21B18F',
                  fontWeight:'bold',
                }}> Kartu Anggota </Text>
              </View>

              <Text style={{
                  fontSize:18,
                  color:'#fff',
                  fontWeight:'bold',
                  marginTop:20,
              }}> Kemudahan Transaksi </Text>

                <View style={{ 
                  flexDirection:'row', 
                  justifyContent:'space-around',
                  width:'100%',
                  marginTop:10, marginBottom:30,
                }}>
                  <TouchableOpacity onPress={() => { setModalVisibleSetor(true); }}>
                    <Image source={require('./assets/home/kartu/setor.png')} style={{
                      height:100, width:100,
                    }}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setModalVisibleTarik(true); }}>
                    <Image source={require('./assets/home/kartu/tarik.png')} style={{
                      height:100, width:100,
                    }}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setModalVisibleBayar(true); }}>
                    <Image source={require('./assets/home/kartu/bayar.png')} style={{
                      height:100, width:100,
                    }}/>
                  </TouchableOpacity>
                </View>
              
              <View style={{width:250, height:157.2}}>
                <Image source={require('./assets/home/kartu/kartu.png')} style={{
                  width:250, height:157.2
                }}></Image>
                <View style={{
                  width:50, height:50,
                  alignItems:'center', justifyContent:'center',
                  position:'absolute',
                  top:'30%', left:'10%',
                  backgroundColor:'#fff',
                }}>
				// QR CODE GENERATOR ===========================================================================================
                  <QRCode
                    value = {QRtext}
                    logo =  {QRlogo}
                    backgroundColor = "#fff"
                    size = {47}
                    logoMargin = {3}
                    logoBackgroundColor = "#fff"
                    logoSize = {10}
                  />
                </View>
              </View>
            </View>
            
            <View style={{
              marginTop:40,
              width:'100%',
              backgroundColor:'#fff'}}>
              <Text style={{
                textAlign:'center',
                marginVertical:15,
                fontSize:20,
                fontWeight:'bold',
                color:'#21B18F',
              }}>Kategori Sampah</Text>
              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                    <View style={{ marginHorizontal:30, marginBottom:15 }}>
                      <TouchableOpacity onPress={() => { setModalVisibleBesi(true); }}>
                        <Image source={require('./assets/home/tong-besi.png')} style={{
                          position:'relative',
                          width:90, height:90,
                          marginBottom:5,
                        }}></Image>
                        <Text style={{
                          textAlign:'center',
                          fontSize:18,
                          fontWeight:'bold',
                          color:'#FBC108',
                        }}>Besi</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:30, marginBottom:15 }}>
                      <TouchableOpacity onPress={() => { setModalVisibleKaca(true); }}>
                        <Image source={require('./assets/home/tong-kaca.png')} style={{
                          position:'relative',
                          width:90, height:90,
                          marginBottom:5,
                        }}></Image>
                        <Text style={{
                          textAlign:'center',
                          fontSize:18,
                          fontWeight:'bold',
                          color:'#01AE54',
                        }}>Kaca</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:30, marginBottom:15 }}>
                      <TouchableOpacity onPress={() => { setModalVisibleKertas(true); }}>
                        <Image source={require('./assets/home/tong-kertas.png')} style={{
                          position:'relative',
                          width:90, height:90,
                          marginBottom:5,
                        }}></Image>
                        <Text style={{
                          textAlign:'center',
                          fontSize:18,
                          fontWeight:'bold',
                          color:'#016AAE',
                        }}>Kertas</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal:30, marginBottom:15 }}>
                      <TouchableOpacity onPress={() => { setModalVisiblePlastik(true); }}>
                        <Image source={require('./assets/home/tong-plastik.png')} style={{
                          position:'relative',
                          width:90, height:90,
                          marginBottom:5,
                        }}></Image>
                        <Text style={{
                          textAlign:'center',
                          fontSize:18,
                          fontWeight:'bold',
                          color:'#FF7D05',
                        }}>Plastik</Text>
                      </TouchableOpacity>
                    </View>
              </ScrollView>
            </View>
            
            <View style={{
              // marginVertical:40,
              width:'100%',
              backgroundColor:'#fff'}}>
              <Text style={{
                textAlign:'center',
                marginVertical:15,
                fontSize:20,
                fontWeight:'bold',
                color:'#21B18F',
              }}>Informasi Berita</Text>
              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flexDirection:'row' }}>
                <View style={{ marginHorizontal:30, marginBottom:30 }}>
                  <LinearGradient colors={['#05B8E6', '#33D9B2']} style={{
                    height:130, width:200,
                    borderRadius:10,
                    shadowColor:'#000000',
                    shadowOffset: { width: 4,height: 4},
                    shadowOpacity: 0.7,
                    shadowRadius: 7,
                    elevation: 4,
                  }}>
                    <View style={{
                      height:'30%', width:'100%',
                      backgroundColor:'#fff',
                      position:'absolute', bottom:0, justifyContent:'center',
                      borderBottomLeftRadius:10, borderBottomRightRadius:10,
                    }}>
                      <Text style={{
                        fontSize:16, color:'#21B18F', marginLeft:10
                      }}>Berita 1</Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{ marginHorizontal:30, marginBottom:30 }}>
                  <LinearGradient colors={['#05B8E6', '#33D9B2']} style={{
                    height:130, width:200,
                    borderRadius:10,
                    shadowColor:'#000000',
                    shadowOffset: { width: 4,height: 4},
                    shadowOpacity: 0.7,
                    shadowRadius: 7,
                    elevation: 4,
                  }}>
                    <View style={{
                      height:'30%', width:'100%',
                      backgroundColor:'#fff',
                      position:'absolute', bottom:0, justifyContent:'center',
                      borderBottomLeftRadius:10, borderBottomRightRadius:10,
                    }}>
                      <Text style={{
                        fontSize:16, color:'#21B18F', marginLeft:10
                      }}>Berita 2</Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{ marginHorizontal:30, marginBottom:30 }}>
                  <LinearGradient colors={['#05B8E6', '#33D9B2']} style={{
                    height:130, width:200,
                    borderRadius:10,
                    shadowColor:'#000000',
                    shadowOffset: { width: 4,height: 4},
                    shadowOpacity: 0.7,
                    shadowRadius: 7,
                    elevation: 4,
                  }}>
                    <View style={{
                      height:'30%', width:'100%',
                      backgroundColor:'#fff',
                      position:'absolute', bottom:0, justifyContent:'center',
                      borderBottomLeftRadius:10, borderBottomRightRadius:10,
                    }}>
                      <Text style={{
                        fontSize:16, color:'#21B18F', marginLeft:10
                      }}>Berita 3</Text>
                    </View>
                  </LinearGradient>
                </View>
              </ScrollView>
            </View>
          </View>
          {/* MODAL HOME SETOR  ============================================================================= */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSetor}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
                
              <View style={styles.centeredHome}>
                <View style={styles.modalHome}>
                  <Image source={require('./assets/home/kartu/setor.png')} style={styles.imageModalKartu}/>
                  <Text style={styles.modalTextHome}>Setor Sampah</Text>
                  <Text style={styles.modalDeskHome}>Penyetoran sampah sangat simpel dan mudah hanya menunjukkan kartu anggota atau QR Code yang ada dalam aplikasi</Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori }}
                    onPress={() => {setModalVisibleSetor(!modalSetor);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME SETOR END  ===================================================================== */}
          {/* MODAL HOME TARIK  ============================================================================= */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalTarik}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
                
              <View style={styles.centeredHome}>
                <View style={styles.modalHome}>
                  <Image source={require('./assets/home/kartu/tarik.png')} style={styles.imageModalKartu}/>
                  <Text style={styles.modalTextHome}>Tarik Saldo</Text>
                  <Text style={styles.modalDeskHome}>Tarik saldo anda dengan proses yang mudah di cabang Bank Sampah hanya dengan menunjukkan kartu anggota</Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori }}
                    onPress={() => {setModalVisibleTarik(!modalTarik);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME TARIK END  ===================================================================== */}
          {/* MODAL HOME BAYAR  ============================================================================= */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalBayar}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
                
              <View style={styles.centeredHome}>
                <View style={styles.modalHome}>
                  <Image source={require('./assets/home/kartu/bayar.png')} style={styles.imageModalKartu}/>
                  <Text style={styles.modalTextHome}>Bayar Kebutuhan</Text>
                  <Text style={styles.modalDeskHome}>Bayar kebutuhan sehari-hari seperti pulsa, listrik, dll. menggunakan saldo Bank Sampah di cabang terdekat.</Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori }}
                    onPress={() => {setModalVisibleBayar(!modalBayar);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME BAYAR END  ===================================================================== */}
          {/* MODAL HOME BESI  ============================================================================== */}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalBesi}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
              <View style={styles.bgModal}></View>
              <View style={styles.centeredKategori}>
                <View style={styles.modalKategori}>
                  <Image source={require('./assets/home/tong-besi.png')} style={styles.imageModalKategori}/>
                  <Text style={styles.modalTextBesi}>Sampah Besi</Text>
                  <Text style={styles.modalDeskBesi}>Macam-macam sampah besi antara lain 
                  Per/kawat, wajan/penggorengan, regulator, kran air besi, stainless, paku, Kaleng/Seng, 
                  aluminium, dll.
                  </Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori, marginBottom:10 }}
                    onPress={() => {setModalVisibleBesi(!modalBesi);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME BESI END  ====================================================================== */}
          {/* MODAL HOME KACA  ============================================================================== */}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalKaca}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
              <View style={styles.bgModal}></View>
              <View style={styles.centeredKategori}>
                <View style={styles.modalKategori}>
                  <Image source={require('./assets/home/tong-kaca.png')} style={styles.imageModalKategori}/>
                  <Text style={styles.modalTextKaca}>Sampah Kaca</Text>
                  <Text style={styles.modalDeskKaca}>Macam-macam sampah kaca antara lain 
                  botol kaca, piring kaca, gelas kaca, lampu, dan bahan-bahan lain yang terbuat dari kaca 
                  </Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori, marginBottom:10 }}
                    onPress={() => {setModalVisibleKaca(!modalKaca);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME KACA END  ====================================================================== */}
          {/* MODAL HOME KERTAS  ============================================================================== */}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalKertas}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
              <View style={styles.bgModal}></View>
              <View style={styles.centeredKategori}>
                <View style={styles.modalKategori}>
                  <Image source={require('./assets/home/tong-kertas.png')} style={styles.imageModalKategori}/>
                  <Text style={styles.modalTextKertas}>Sampah Kertas</Text>
                  <Text style={styles.modalDeskKertas}>Macam-macam sampah kertas antara lain 
                  kardus, buku, koran, tisu, majalah, brosur, bungkus rokok, dan bahan-bahan lain yang terbuat dari kertas.
                  </Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori, marginBottom:10 }}
                    onPress={() => {setModalVisibleKertas(!modalKertas);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME KERTAS END  ====================================================================== */}
          {/* MODAL HOME PLASTIK  ============================================================================== */}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalPlastik}
              onRequestClose={() => {
                Alert.alert("Tutup modal...");
              }}>
              <View style={styles.bgModal}></View>
              <View style={styles.centeredKategori}>
                <View style={styles.modalKategori}>
                  <Image source={require('./assets/home/tong-plastik.png')} style={styles.imageModalKategori}/>
                  <Text style={styles.modalTextPlastik}>Sampah Plastik</Text>
                  <Text style={styles.modalDeskPlastik}>Macam-macam sampah plastik antara lain 
                  tas kresek, botol plastik, gelas plastik, piring plastik, mainan plastik, toples, ember, 
                  dan bahan-bahan lain yang terbuat dari plastik.
                  </Text>
                  <TouchableHighlight
                    style={{ ...styles.closeModalKategori }}
                    onPress={() => {setModalVisiblePlastik(!modalPlastik);}}>
                    <Text style={{...styles.textStyleKategori, fontSize:40, }}> x </Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL HOME PLASTIK END  ====================================================================== */}
        </ScrollView>

          {/* NAVBAR  =============================================================== */}
          <View style={{
            position:'absolute',
            bottom:0, alignItems:'center',
            height:50, width:'100%', 
            backgroundColor: '#2fcca8',}}>
            <Image source={require('./assets/navbar/bg-setor.png')} style={{
              height:65, width:82.7, 
              position:'absolute',
              // left:'38.5%',
              top:'-29%',
            }}/>
            <View style={{
              position:'absolute',
              width:'100%',
              justifyContent:'space-around', flexDirection:'row'
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{
                  height:30, width:32.5,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/home2.png')} style={{
                  height:30, width:32.5,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Setor')} style={{
                  height:30, width:38.4,
                }}>
                <Image source={require('./assets/navbar/setor1.png')} style={{
                  height:30, width:38.4,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{
                  height:30, width:26.8,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/profile1.png')} style={{
                  height:30, width:26.8,
                }}/>
              </TouchableOpacity>
            </View>
          </View>
          {/* END NAVBAR END  =============================================================== */}
          <StatusBar style="auto" />
        </SafeAreaView>
      );
    }
    function LoginScreen({ navigation }) {
      // AlertLewati  ========================================================================================== 
      const AlertLewati = () =>
      Alert.alert(
        "LOGIN",
        "Yakin lewati login?",
        [
          {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yakin", onPress: () => navigation.navigate('Home') }
        ],
        { cancelable: false }
      );

      // HidePassword  =========================================================================================
      const [hidePass, setHidePass] = React.useState(true);

      // Firebase Login  =======================================================================================
      const [email, setEmail] = useState({ value: '', error: '' })
      const [password, setPassword] = useState({ value: '', error: '' })
      const [loading, setLoading] = useState()
      const [error, setError] = useState()

      const onLoginPressed = async () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is logged in
            navigation.navigate( "Home", { index:0, name: 'Home' } )
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Home' }],
            // })
          } else {
            // User is not logged in
            navigation.navigate( "Login", { index:0, name: 'Login' } )
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Login' }],
            // })
          }
        })
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
          if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
          }
          setLoading(true)
          const response = await loginUser({
            email: email.value,
            password: password.value,
          })
          if (response.error) {
            setError(response.error)
          }
          setLoading(false)
        }

      return (
          <ImageBackground source={require('./assets/bg-login.png')} style={styles.image_bgl}>

        <SafeAreaView style={styles.container}>
          <Image source={require('./assets/logo.png')} style={{ width: 130, height: 120, marginBottom:40 }}/> 
          <View style={{
            justifyContent: 'center',
            position:'relative',
            width:330, left:'0%',
            borderRadius:20,
            backgroundColor:'rgba(255, 255, 255, 0.2)',
            shadowColor:'#000000',
            shadowOffset: { width: 4,height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 2,
          }}>
            <Text style={styles.title}> 
              Username
            </Text>
            <TextInput2
            style={styles.input}
            returnKeyType="next"
            placeholder={"Masukkan username"} 
            placeholderTextColor={'#fff'}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            value={email.value}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            
            />
            <Text style={styles.title}>
              Password
            </Text>
            <TextInput2
            secureTextEntry={hidePass ? true : false}
            style={styles.input}
            returnKeyType="done"
            placeholder={"Masukkan password"} placeholderTextColor={'#fff'}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            value={password.value}
            error={!!password.error}
            errorText={password.error}
            />
            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={18}
              style={styles.icon_hide}
              color="white"
              onPress={() => setHidePass(!hidePass)}
            />

            <View style={{ alignItems:'center' }}>
              <TouchableOpacity
                loading={loading}
                onPress={onLoginPressed}
                style={styles.btn_login}>
                <Text style={styles.btn_login_text}>LOGIN</Text>
              </TouchableOpacity>
              
              <Text style={styles.lewat} onPress={AlertLewati}> 
                Lewati
              </Text>
            </View>

          </View>

          <Text style={{ color:'#fff', marginTop:90 }}> 
            Copyright  ©2020
          </Text>

          <Toast message={error} onDismiss={() => setError('')} />
          <StatusBar style="auto" />
        </SafeAreaView>
          </ImageBackground>
      );
    }

// FIREBASE CHATS  ==========================================================================================
    function MessageScreen({ navigation }) {
      const [user, setUser] = useState(null)
      const [name, setName] = useState('')
      const [messages, setMessages] = useState([])

      useEffect(() => {
          readUser()
          const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
              const messagesFirestore = querySnapshot
                  .docChanges()
                  .filter(({ type }) => type === 'added')
                  .map(({ doc }) => {
                      const message = doc.data()
                      //createdAt is firebase.firestore.Timestamp instance
                      //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
                      return { ...message, createdAt: message.createdAt.toDate() }
                  })
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              appendMessages(messagesFirestore)
          })
          return () => unsubscribe()
      }, [])

      const appendMessages = useCallback(
          (messages) => {
              setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
          },
          [messages]
      )

      async function readUser() {
          const user = await AsyncStorage.getItem('user')
          if (user) {
              setUser(JSON.parse(user))
          }
      }
      async function handlePress() {
          const _id = Math.random().toString(36).substring(7)
          const user = { _id, name }
          await AsyncStorage.setItem('user', JSON.stringify(user))
          setUser(user)
      }
      async function handleSend(messages) {
          const writes = messages.map((m) => chatsRef.add(m))
          await Promise.all(writes)
      }
      if (!user) {
          return (
              <View style={styles.container}>
                  <TextInput style={styles.inputMessage} placeholder="Enter your name" placeholderTextColor='#21B18F' value={name} onChangeText={setName} />
                  <Button onPress={handlePress} title="Enter the chat" />
              </View>
          )
      }
      return <GiftedChat messages={messages} user={user} onSend={handleSend} />
    };
    
    function SetorScreen({ navigation }) {

      // MODAL SETOR ===========================================================================================
      const [modalVisible, setModalVisible] = useState(false);
      // QR CODE GENERATOR ===========================================================================================
      const QRlogo = require('./assets/logo-per.png')
      const QRtext = "PjK2eLRkuihzijlgI3s29ofemrB2"

      return (
        <SafeAreaView style={{ height:'100%', backgroundColor:'#eeeeee' }}>
        <ScrollView>
          <Image source={require('./assets/setor/hd-setor.png')} style={{
            position:'absolute',
            width:'100%', height:77.1,
            top:0, left:0
          }}></Image>
          
          <Text style={
            {fontSize:20, 
            fontWeight:'bold',
            color:'#fff',
            marginTop:30,
            textAlign:'center',
          }}>Setor Sampah</Text>
          
          <TouchableOpacity style={{ 
            width:'90%', height:50,
            left:15, top:40,
            justifyContent:'center', }}
            onPress={() => {setModalVisible(true);}}>
            <Image source={require('./assets/setor/qr-setor.png')} style={{
              width:'100%', height:50,
            }}></Image>
            <Text style={{
              position:'absolute',
              fontSize:18, 
              fontStyle:'normal',
              color:'#fff',
              left:'45%',
            }}>QR Code</Text>
          </TouchableOpacity>

          <View style={{
            position:'relative',
            width:'90%', left:'5%',
            backgroundColor:'#fff',
            borderRadius:15,
            marginTop:60,
            shadowColor:'#fff',
            shadowOffset: { width: 0,height: 4},
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 8}}>
            <Image source={require('./assets/setor/top-setor.png')} style={{
              position:'relative',
              width:'100%', height:39.5,
            }}></Image>
            <Text style={{
              fontSize:18, 
              fontStyle:'normal',
              color:'#fff',
              marginTop:-35,
              textAlign:'center',
            }}>Syarat & Ketentuan</Text>
            <View style={{ marginVertical:20 }}>
              <Text style={styles.sk_setor}
              >1. Tata cara penyetoran sampah</Text>
              
              <Text style={styles.sk_setor}
              >2. Waktu penyetoran sampah</Text>
              
              <Text style={styles.sk_setor}
              >3. Kategori sampah</Text>
              
              <Text style={styles.sk_setor}
              >4. Dan lain-lain</Text>
            </View>
          </View>

          <View style={{
            position:'relative',
            width:'90%', left:'5%',
            backgroundColor:'#fff',
            borderRadius:15,
            marginTop:40,
            marginBottom:100,
            shadowColor:'#fff',
            shadowOffset: { width: 0,height: 4},
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 8}}>
            <Image source={require('./assets/setor/top-setor.png')} style={{
              position:'relative',
              width:'100%', height:39.5,
            }}></Image>
            <Text style={{
              fontSize:18, 
              fontStyle:'normal',
              color:'#fff',
              marginTop:-35,
              textAlign:'center',
            }}>Harga Penjualan</Text>
            <View style={{ marginVertical:20 }}>
              <Text style={styles.sk_setor}
              >Sampah Kaca</Text>
              <Text style={styles.sk_harga}
              >Rp. 10.000</Text>

              <Text style={styles.sk_setor}
              >Sampah Kertas</Text>
              <Text style={[styles.sk_harga, {marginTop:31}]}
              >Rp. 10.000</Text>
              
              <Text style={styles.sk_setor}
              >Sampah Plastik</Text>
              <Text style={[styles.sk_harga, {marginTop:57}]}
              >Rp. 10.000</Text>
              
              <Text style={styles.sk_setor}
              >Sampah Besi</Text>
              <Text style={[styles.sk_harga, {marginTop:83}]}
              >Rp. 10.000</Text>
              
              <Text style={{
                fontSize:16,
                color:'#1B9578',
                marginTop:15,
                textAlign:'center',
              }}>*Harga satuan /kilogram</Text>
            </View>
          </View>

          {/* MODAL SETOR  ============================================================================= */}
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}>
                
              <View style={styles.bgModal}></View>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Bank Sampah</Text>

                  <View style={{
                      width:300, height:300,
                      alignItems:'center', justifyContent:'center',
                      // position:'absolute',
                      // top:'73%', left:'23%',
                      backgroundColor:'#fff',
                    }}>
                      <QRCode
                        value = {QRtext}
                        logo =  {QRlogo}
                        backgroundColor = "#fff"
                        size = {260}
                        logoMargin = {5}
                        logoBackgroundColor = "#fff"
                        logoSize = {70}
                      />
                    </View>

                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3", marginBottom:10 }}
                    onPress={() => {setModalVisible(!modalVisible);}}>
                    <Text style={{...styles.textStyle, fontSize:16, }}>- Tutup -</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
          {/* END MODAL SETOR END  ===================================================================== */}
        </ScrollView>
          {/* NAVBAR  =============================================================== */}
          <View style={{
            position:'absolute',
            bottom:0, alignItems:'center',
            height:50, width:'100%', 
            backgroundColor: '#2fcca8',}}>
            <Image source={require('./assets/navbar/bg-setor.png')} style={{
              height:65, width:82.7, 
              position:'absolute',
              // left:'38.5%',
              top:'-29%',
            }}/>
            <View style={{
              position:'absolute',
              width:'100%',
              justifyContent:'space-around', flexDirection:'row'
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{
                  height:30, width:32.5,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/home1.png')} style={{
                  height:30, width:32.5,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Setor')} style={{
                  height:30, width:38.4,
                }}>
                <Image source={require('./assets/navbar/setor2.png')} style={{
                  height:30, width:38.4,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{
                  height:30, width:26.8,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/profile1.png')} style={{
                  height:30, width:26.8,
                }}/>
              </TouchableOpacity>
            </View>
          </View>
          {/* END NAVBAR END  =============================================================== */}
          <StatusBar style="auto" />
        </SafeAreaView>
      );
    }

    function ProfileScreen({ navigation }) {
      // ALERT SIMPAN  ========================================================================================== 
      const AlertSimpan = () =>
      Alert.alert(
        "SIMPAN",
        "Yakin simpan perubahan?",
        [
          {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Simpan", onPress: () => console.log("Data Disimpan") }
        ],
        { cancelable: false }
      );
      return (
        <SafeAreaView style={{ height:'100%', }}>
        <ScrollView>

          <View style={{ alignItems:'center' }} >
            <Image source={require('./assets/profile/hd-profile.png')} style={{
              position:'absolute',
              width:'100%', height:155.7,
              top:0, left:0
            }}></Image>
            
            <Text style={{
              fontSize:20, 
              fontWeight:'bold',
              color:'#fff', 
              marginTop:50,
            }}>Hello, Nama</Text>

            <Image source={require('./assets/profile/foto-profile.png')} style={{
              position:'relative',
              width:110, height:110,
              top:20,
            }}></Image>
          </View>
          
          <View style={{ marginBottom:80 }}>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:10 }}>
              <Image source={require('./assets/profile/pro-name.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Nama Lengkap Pengguna</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:35 }}>
              <Image source={require('./assets/profile/pro-tanggal.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Tanggal Lahir</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:35 }}>
              <Image source={require('./assets/profile/pro-alamat.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Alamat</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:35 }}>
              <Image source={require('./assets/profile/pro-telepon.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Nomor Telepon</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:35 }}>
              <Image source={require('./assets/profile/pro-email.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Email</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>
            <View style={{ flex:1, backgroundColor:'transparent', marginTop:35 }}>
              <Image source={require('./assets/profile/pro-password.png')} style={{
                position:'absolute',
                width:30, height:30,
                left:'5%', top:25,
              }}></Image> 
              <Text style={{
                position:'relative',
                fontSize:18,
                left:'20%', top:30,
                color:'#21B18F',
              }}>Password</Text>
              <View style={{
                backgroundColor:'#21B18F',
                position:'relative',
                height:2, width:'90%',
                left:'5%', bottom:-40,
                opacity:0.5,
              }}></View>
            </View>

            <View style={{ alignItems:'center' }}>
              <TouchableOpacity
                  onPress={AlertSimpan}
                  style={styles.btn_simpan}>
                  <Text style={styles.btn_simpan_text}> SIMPAN </Text>
              </TouchableOpacity>
              <View style={{
                  // backgroundColor:'#21B18F',
                  position:'relative',
                  height:2, width:'90%',
                  marginVertical:10,
                  opacity:0.5,
              }}></View>
              <TouchableOpacity
                  onPress={logoutUser}
                  style={styles.btn_logout}>
                  <Text style={styles.btn_simpan_text}> LOGOUT </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width:'100%' }} >
              <TouchableOpacity onPress={() => navigation.navigate('Message')} style={{
                width:108, left:10,
                marginVertical:30}}>
                <Text style={{
                  fontSize:16,
                  color:'#21B18F',
                  borderBottomWidth: 2,
                  borderBottomColor: '#21B18F',}}
                  > Hubungi Kami </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width:163,
                position:'absolute',
                right:10, top:30,
                borderBottomWidth: 2,
                borderBottomColor: '#21B18F',}}>
                <Text style={{ fontSize:16, color:'#21B18F' }}
                >Tentang Bank Sampah</Text>
              </TouchableOpacity>
            </View>

          </View>
        
          </ScrollView>
          {/* NAVBAR  =============================================================== */}
          <View style={{
            position:'absolute',
            bottom:0, alignItems:'center',
            height:50, width:'100%', 
            backgroundColor: '#2fcca8',}}>
            <Image source={require('./assets/navbar/bg-setor.png')} style={{
              height:65, width:82.7, 
              position:'absolute',
              // left:'38.5%',
              top:'-29%',
            }}/>
            <View style={{
              position:'absolute',
              width:'100%',
              justifyContent:'space-around', flexDirection:'row'
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{
                  height:30, width:32.5,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/home1.png')} style={{
                  height:30, width:32.5,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Setor')} style={{
                  height:30, width:38.4,
                }}>
                <Image source={require('./assets/navbar/setor1.png')} style={{
                  height:30, width:38.4,
                }}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{
                  height:30, width:26.8,
                  top:10,
                }}>
                <Image source={require('./assets/navbar/profile2.png')} style={{
                  height:30, width:26.8,
                }}/>
              </TouchableOpacity>
            </View>
          </View>
          {/* END NAVBAR END  =============================================================== */}
          <StatusBar style="auto" />
        </SafeAreaView>
      );
    }
  // NAVIGATION ANIMATION =======================================================================================
    const horizontalAnimation = {
      gestureDirection: 'horizontal',
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              }, 
            ],
          },
        };
      },
    };
    // END NAVIGATION ANIMATION END =============================================================================
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={horizontalAnimation} 
        headerMode={"none"}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Setor" component={SetorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
 
const styles = StyleSheet.create({
  // LoginScreen  ===========================================================================================
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'transparent',
    justifyContent: 'center',
  },
  image_bgl: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    marginTop:20,
    marginLeft:35
  },
  input: {
    height: 40, 
    width: 250,
    left:35,
    marginBottom:5,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: '#ffffff',
    fontSize:18,
    borderStyle:'solid',
    backgroundColor:'transparent',
  },
  btn_login: {
    backgroundColor: 'transparent',
    width:108,
    marginTop:20,
    alignItems:'center'
  },
  btn_login_text: {
    fontSize: 20, 
    fontWeight:'bold',
    backgroundColor:'#fff',
    paddingVertical:5, 
    paddingHorizontal:25,
    borderRadius:30,
    color: '#2fcca8',
  },
  lewat: {
    color: '#ffffff',
    marginTop:10,
    marginBottom:20,
    fontSize: 16,
  },
  icon_hide: {
    position: 'absolute',
    top:'49%', left:'78%'
  },
  // END_LoginScreen  ========================================================================================
  inputMessage: {
    height: 40, 
    width: 250, 
    marginTop:5,
    marginBottom:20,
    borderBottomWidth: 2,
    borderBottomColor: '#21B18F',
    color: '#21B18F',
    fontSize:18,
    borderStyle:'solid',
  },
  // MODAL SETOR  =====================================
  bgModal: {
    height:'100%', width:'100%',
    position:'absolute',
    backgroundColor:'#000000', opacity:0.6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#2196F3',
  },
  sk_setor: {
    fontSize:16,
    color:'#1B9578',
    marginTop:5, marginLeft:25
  },
  sk_harga: {
    position:'absolute',
    left:220,
    fontSize:16,
    color:'#1B9578',
    marginTop:5, marginLeft:15
  },
  // MODAL HOME  =====================================
  centeredHome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%', height:'100%',
    marginTop: 60,
    backgroundColor:'#000000'
  },
  modalHome: {
    margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    // padding: 5,
    height:'100%', width:'100%',
    alignItems: "center", justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openModalHome: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    marginTop:20,
    padding: 10,
    elevation: 2
  },
  imageModalKartu: {
    width:150, height:150,
  },
  textStyleHome: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextHome: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#21B18F',
  },
  modalDeskHome: {
    fontSize:15,
    width:'80%',
    // fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#21B18F',
  },
  // MODAL HOME KATEGORI  =====================================
  centeredKategori: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%', height:'100%',
    backgroundColor:'transparent',
  },
  modalKategori: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20, paddingTop:100,
    width:'90%',
    alignItems: "center", justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageModalKategori: {
    width:150, height:150,
    position:'absolute', 
    top:-80,
    backgroundColor:'#fff',
    borderRadius:100

  },
  // BESI ++++++++++++++++++++++++++++++++
  modalTextBesi: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#FBC108',
  },
  modalDeskBesi: {
    fontSize:15,
    width:'90%',
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#FBC108',
  },
  // KACA ++++++++++++++++++++++++++++++++
  modalTextKaca: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#01AE54',
  },
  modalDeskKaca: {
    fontSize:15,
    width:'90%',
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#01AE54',
  },
  // KERTAS ++++++++++++++++++++++++++++++++
  modalTextKertas: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#016AAE',
  },
  modalDeskKertas: {
    fontSize:15,
    width:'90%',
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#016AAE',
  },
  // PLASTIK ++++++++++++++++++++++++++++++++
  modalTextPlastik: {
    fontSize:18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#FF7D05',
  },
  modalDeskPlastik: {
    fontSize:15,
    width:'90%',
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
    color:'#FF7D05',
  },


  closeModalKategori: {
    backgroundColor: "transparent",
    borderRadius: 20,
    marginTop:10, marginBottom:10
  },
  textStyleKategori: {
    color: "#bdbdbd",
    fontWeight: "bold",
    textAlign: "center"
  },
  // PROFILE ====================================================
  btn_simpan: {
    backgroundColor: '#058CE6',
    marginTop:80, alignItems:'center',
    width:'90%',
    borderRadius:20,
  },
  btn_simpan_text: {
    fontSize: 20, 
    fontWeight:'bold', 
    marginVertical:5,
    color: '#fff',
  },
  btn_logout: {
    backgroundColor: '#FF0000',
    alignItems:'center',
    width:'90%',
    borderRadius:20,
  },
});